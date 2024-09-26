import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../services/store/store";
import { fetchIngredientData } from "../../services/reducers/profileOrdersSlice";
import { ProfileOrderDetails } from "../../components/modals/profileOrderModal/profileOrderDetails";

interface IngredientImages {
  [key: string]: { image: string; price: number; name: string };
}

function ProfileOrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { number } = useParams();
  const { orders, loading } = useSelector((state: RootState) => state.profileOrders);
  const [ingredientData, setIngredientData] = useState<IngredientImages>({});

  useEffect(() => {
    async function loadIngredientData() {
      try {
        const ingredients = await dispatch(fetchIngredientData()).unwrap();
        const ingredientMap: IngredientImages = ingredients.reduce(
          (acc: IngredientImages, ingredient: { _id: string; image: string; price: number; name: string; }) => ({
            ...acc,
            [ingredient._id]: {
              image: ingredient.image,
              price: ingredient.price,
              name: ingredient.name,
            },
          }), {} as IngredientImages
        );
        setIngredientData(ingredientMap);
      } catch (error) {
        console.error("Ошибка при загрузке данных ингредиентов", error);
      }
    }
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
  

  if (loading) {
    return <p>Загрузка заказа...</p>;
  }

  const order = orders.find((order) => order.number === Number(number));

  if (!order) {
    return <p>Заказ не найден</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <div
      style={{
        display: "flex",
        marginTop: "3rem",
        flexDirection: "column",
        maxWidth: "900px",
      }}
    >
      <ProfileOrderDetails order={order} ingredientData={ingredientData} />
    </div>
    </div>
  );
}

export { ProfileOrderPage };
