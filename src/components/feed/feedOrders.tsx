import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import feedStyles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  connectWebSocket,
  disconnectWebSocket,
  fetchIngredientData,
  Order
} from "../../services/reducers/feedOrdersSlice";
import { RootState, AppDispatch } from "../../services/store/store";
import Modal from "../../components/modals/modal";
import { FeedOrderDetails } from "../modals/feedOrderModal/feedOrderDetails";

interface IngredientImages {
  [key: string]: { image: string; price: number };
}

function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  const [ingredientData, setIngredientData] = useState<IngredientImages>({});
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadIngredientData() {
      try {
        const ingredients = await dispatch(fetchIngredientData()).unwrap();
        const ingredientMap: IngredientImages = ingredients.reduce(
          (acc: IngredientImages, ingredient: { _id: string; image: string; price: number }) => ({
            ...acc,
            [ingredient._id]: { image: ingredient.image, price: ingredient.price }
          }),
          {} as IngredientImages
        );
        setIngredientData(ingredientMap);
      } catch (error) {
        console.error("Ошибка при загрузке данных ингредиентов", error);
      }
    }
    loadIngredientData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(connectWebSocket());
    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  const calculateTotalPrice = (ingredientIds: string[]) => {
    return ingredientIds.reduce((total, id) => {
      const ingredient = ingredientData[id];
      return ingredient ? total + ingredient.price : total;
    }, 0);
  };

  const navigate = useNavigate();

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    window.history.pushState({ modal: true }, '', `/feed/${order.number}`);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    navigate('/feed');
  };

  if (loading)
    return <p style={{ color: '#04CCCC', fontWeight: 'bolder', textAlign: 'center' }}>Загрузка заказов</p>;

  return (
    <section className="feed">
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <ul className={`custom-scroll ${feedStyles.feed__list}`}>
        {orders.map((order) => (
          <li key={order._id} onClick={() => handleOrderClick(order)} style={{ cursor: "pointer" }}>
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
      {selectedOrder && (
        <Modal isOpen={Boolean(selectedOrder)} handleClose={closeModal}>
          <FeedOrderDetails order={selectedOrder} />
        </Modal>
      )}
    </section>
  );
}

export { Feed };
