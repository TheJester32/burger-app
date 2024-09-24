import { Order } from "../../../services/reducers/feedOrdersSlice";

interface orderProps {
  order: Order;
}

function ProfileOrderDetails({ order }: orderProps) {
  if (!order) {
    return <p>Заказ не найден</p>;
  }

  return (
    <div style={{width: '100%', minWidth: '500px'}}>
      <p style={{ marginTop: '5rem' }}>Номер заказа: {order.number}</p>
      </div >
    );
}

export { ProfileOrderDetails };
