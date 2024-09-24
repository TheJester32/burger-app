import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../services/store/store";
import { startConnection, closeConnection } from "../../services/reducers/profileOrdersSlice";
import { ProfileOrderDetails } from "../../components/modals/profileOrderModal/profileOrderDetails";

function ProfileOrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { number } = useParams();
  const { orders, loading } = useSelector((state: RootState) => state.profileOrders);

  useEffect(() => {
    dispatch(startConnection());

    return () => {
      dispatch(closeConnection());
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '6rem' }}>
      <ProfileOrderDetails order={order} />
    </div>
  );
}

export { ProfileOrderPage };
