import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { setOrders, setLoading, setError } from '../reducers/feedOrdersSlice';

const websocketMiddleware: Middleware<{}, any, Dispatch<AnyAction>> = (store: MiddlewareAPI) => {
  let socket: WebSocket | null = null;

  return (next) => (action: any) => {
    console.log('Действие:', action.type);

    switch (action.type) {
      case 'orders/connectWebSocket': {
        if (socket !== null) {
          socket.close();
        }

        const URL = "wss://norma.nomoreparties.space/orders/all";
        socket = new WebSocket(URL);
        console.log('Создание WebSocket соединения');

        store.dispatch(setLoading(true));

        socket.onopen = () => {
          store.dispatch(setLoading(false));
          console.log("WebSocket соединение открыто");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.success) {
              const orders = data.orders.map((order: any) => ({
                _id: order._id,
                number: order.number,
                createdAt: order.createdAt,
                name: order.name,
                ingredients: order.ingredients,
                status: order.status,
              }));
          
              store.dispatch(setOrders({
                orders,
                total: data.total,
                totalToday: data.totalToday,
              }));
            }
          };

        socket.onerror = (error) => {
          store.dispatch(setError("Ошибка WebSocket"));
          console.error("Ошибка WebSocket:", error);
        };

        socket.onclose = () => {
          console.log("WebSocket соединение закрыто");
        };

        break;
      }

      case 'orders/disconnect': {
        if (socket !== null) {
          socket.close();
          console.log("WebSocket соединение закрыто через action");
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};

export default websocketMiddleware;
