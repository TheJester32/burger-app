import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../services/store/store";
import { connectWebSocket, disconnectWebSocket } from "../../services/reducers/feedOrdersSlice";
import { FeedOrderDetails } from "../../components/modals/feedOrderModal/feedOrderDetails";

function FeedOrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { number } = useParams();
  const { orders, loading } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(connectWebSocket());
    return () => {
      dispatch(disconnectWebSocket());
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
      <FeedOrderDetails order={order} />
    </div>
  );
}

export { FeedOrderPage };
