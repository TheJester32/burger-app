import { Middleware } from '@reduxjs/toolkit';
import { setOrders, setLoading, setError } from '../reducers/profileOrdersSlice';

const wsFeedMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;
    const URL = "wss://norma.nomoreparties.space/orders";

    return (next) => (action: any) => {
        switch (action.type) {
            case 'profileOrders/startConnection':
                const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
                if (!accessToken) {
                    store.dispatch(setError("Токен отсутствует"));
                    return;
                }

                store.dispatch(setLoading(true));
                socket = new WebSocket(`${URL}?token=${accessToken}`);

                socket.onopen = () => {
                    store.dispatch(setLoading(false));
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.message === "Invalid or missing token") {
                        store.dispatch(setError("Неверный или отсутствующий токен"));
                        return;
                    }

                    if (data.success) {
                        store.dispatch(setOrders(data.orders));
                    }
                };

                socket.onerror = () => {
                    store.dispatch(setError("Ошибка при работе с WebSocket"));
                };

                socket.onclose = (event) => {
                    if (event.wasClean) {
                        console.log("Соединение закрыто чисто");
                    } else {
                        console.warn(`Обрыв соединения. Код: ${event.code} Причина: ${event.reason}`);
                    }
                };
                break;

            case 'profileOrders/closeConnection':
                if (socket) {
                    socket.close();
                    socket = null;
                }
                break;

            default:
                break;
        }
        return next(action);
    };
};

export default wsFeedMiddleware;
