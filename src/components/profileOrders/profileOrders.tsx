import React, { useEffect, useState } from "react";
import feedStyles from "../feed/feed.module.css";
import { useNavigate } from "react-router";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
  fetchIngredientData,
  Order,
} from "../../services/reducers/profileOrdersSlice";
import { ProfileOrderDetails } from "../modals/profileOrderModal/profileOrderDetails";
import Modal from "../../components/modals/modal";

interface IngredientImages {
  [key: string]: { image: string; price: number; name: string };
}
function ProfileOrders() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.profileOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [ingredientData, setIngredientData] = useState<IngredientImages>({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadIngredientData = async () => {
      try {
        const data = await dispatch(fetchIngredientData()).unwrap();
        const formattedData: IngredientImages = {};
        data.forEach((ingredient) => {
          formattedData[ingredient._id] = { image: ingredient.image, price: ingredient.price, name: ingredient.name };
        });
        setIngredientData(formattedData);
      } catch (error) {
        console.error("Failed to load ingredient data", error);
      }
    };
  
    loadIngredientData();
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
  
    dispatch({
      type: 'socket/connect',
      payload: {
        url: 'wss://norma.nomoreparties.space/orders',
        token: accessToken,
        actions: {
          onOpen: (): any => ({ type: 'feedOrders/wsOpen' }),
          onClose: (): any => ({ type: 'feedOrders/wsClose' }),
          onMessage: (data: any): any => ({ type: 'feedOrders/wsMessage', payload: data }),
        },
      },
    });
    return () => {
      dispatch({
        type: 'socket/disconnect',
      });
    };
  }, [dispatch]);
  

  const calculateTotalPrice = (ingredientIds: string[]) => {
    return ingredientIds.reduce((total, id) => {
      const ingredient = ingredientData[id];
      return ingredient ? total + ingredient.price : total;
    }, 0);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    window.history.pushState({ modal: true }, '', `/profile/orders/${order.number}`);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    navigate('/profile/orders');
  };

  if (loading)
    return (
      <p
        style={{
          color: "#04CCCC",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Загрузка заказов
      </p>
    );

  return (
    <section className="feed">
      <ul className={`custom-scroll ${feedStyles.feed__list}`}>
        {[...orders]
          .sort((a, b) => b.number - a.number)
          .map((order) => (
            <li key={order._id} onClick={() => handleOrderClick(order)} style={{ cursor: "pointer" }}>
              <div className={feedStyles.feed__list_inner_wrapper}>
                <p
                  className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
                >
                  {`#${order.number}`}
                </p>
                <p
                  className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
                >
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <h4
                className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
              >
                {order.name}
              </h4>
              <p
                style={{
                  color:
                    order.status === "done"
                      ? "#fff"
                      : order.status === "pending"
                      ? "#5AC9CA"
                      : "#D43E2B",
                  marginTop: 0,
                  marginBottom: "1rem",
                }}
                className="text text_type_main-default"
              >
                {order.status === "done"
                  ? "Выполнен"
                  : order.status === "pending"
                  ? "Готовится"
                  : "Не выполнен"}
              </p>
              <div className={feedStyles.feed__list_inner_wrapper}>
                <div className={feedStyles.feed__list_ingredients}>
                  {order.ingredients.slice(0, 5).map((ingredientId, idx) => (
                    <div
                      className={feedStyles.feed__list_ingredient_img_wrapper}
                      key={idx}
                    >
                      <img
                        className={feedStyles.feed__list_ingredient_img}
                        src={ingredientData[ingredientId]?.image}
                        alt="Ингредиент."
                      />
                    </div>
                  ))}
                  {order.ingredients.length > 5 && (
                    <div
                      className={feedStyles.feed__list_ingredient_img_more_wrapper}
                    >
                      <img
                        className={feedStyles.feed__list_ingredient_img}
                        src={ingredientData[order.ingredients[5]]?.image}
                        alt="Ингредиент."
                      />
                      <span
                        className={`text text_type_digits-default ${feedStyles.feed__list_ingredient_img_more}`}
                      >
                        +{order.ingredients.length - 5}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p
                    className={`text text_type_digits-default ${feedStyles.feed__list_price}`}
                  >
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
          <ProfileOrderDetails order={selectedOrder} ingredientData={ingredientData} />
        </Modal>
      )}
    </section>
  );
}

export { ProfileOrders };
