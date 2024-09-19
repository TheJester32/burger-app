import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import feedStyles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setOrders, setLoading, setError } from "../../services/reducers/feedOrdersSlice";
import { RootState, AppDispatch } from "../../services/store/store";
import { fetchIngredientData } from "../../services/reducers/feedOrdersSlice";

interface IngredientImages {
  [key: string]: { image: string, price: number };
}

function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  const [ingredientData, setIngredientData] = useState<IngredientImages>({});

  useEffect(() => {
    async function loadIngredientData() {
      const data = await fetchIngredientData();
      setIngredientData(data);
    }
    
    loadIngredientData();
  }, []);

  useEffect(() => {
    const URL = 'wss://norma.nomoreparties.space/orders/all';

    dispatch(setLoading(true));

    const socket = new WebSocket(URL);

    socket.onopen = () => {
      dispatch(setLoading(false));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        dispatch(setOrders(data.orders));
      }
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
      dispatch(setError("Ошибка при работе с WebSocket"));
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.warn("Обрыв соединения");
      }
    };

    return () => {
      socket.close();
      console.log("WebSocket соединение закрыто");
    };
  }, [dispatch]);

  const calculateTotalPrice = (ingredientIds: string[]) => {
    return ingredientIds.reduce((total, id) => {
      const ingredient = ingredientData[id];
      return ingredient ? total + ingredient.price : total;
    }, 0);
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <section className="feed">
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <ul className={`custom-scroll ${feedStyles.feed__list}`}>
        {orders.map((order) => (
          <li key={order._id}>
            <div className={feedStyles.feed__list_inner_wrapper}>
              <p className={`text text_type_digits-default ${feedStyles.feed__list_number}`}>
                {`#${order.number}`}
              </p>
              <p className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <h4 className={`text text_type_main-medium ${feedStyles.feed__list_name}`}>
              {order.name}
            </h4>
            <div className={feedStyles.feed__list_inner_wrapper}>
              <div className={feedStyles.feed__list_ingredients}>
                {order.ingredients.slice(0, 5).map((ingredientId, idx) => (
                  <div className={feedStyles.feed__list_ingredient_img_wrapper} key={idx}>
                    <img
                      className={feedStyles.feed__list_ingredient_img}
                      src={ingredientData[ingredientId]?.image}
                      alt="Ингредиент."
                    />
                  </div>
                ))}
                {order.ingredients.length > 5 && (
                  <div className={feedStyles.feed__list_ingredient_img_more_wrapper}>
                    <img
                      className={feedStyles.feed__list_ingredient_img}
                      src={ingredientData[order.ingredients[5]]?.image}
                      alt="Ингредиент."
                    />
                    <span className={`text text_type_digits-default ${feedStyles.feed__list_ingredient_img_more}`}>
                      +{order.ingredients.length - 5}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className={`text text_type_digits-default ${feedStyles.feed__list_price}`}>
                  {calculateTotalPrice(order.ingredients)}
                </p>
                <CurrencyIcon type={"primary"} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { Feed };
