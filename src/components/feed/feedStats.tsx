import React, { useEffect, useState } from "react";
import feedStyles from "./feed.module.css";

type Order = {
  id: string;
  ready: boolean;
};

function FeedStats() {
  const [readyOrders, setReadyOrders] = useState<Order[]>([]);
  const [inWorkOrders, setInWorkOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);

  useEffect(() => {
    const URL = "wss://norma.nomoreparties.space/orders/all";

    const socket = new WebSocket(URL);

    socket.onopen = () => {
      console.log("WebSocket соединение открыто");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        const ready = data.orders.filter(
          (order: any) => order.status === "done"
        ).map((order: any) => ({
          id: order.number.toString(),
          ready: true,
        }));
        const inWork = data.orders.filter(
          (order: any) => order.status !== "done"
        ).map((order: any) => ({
          id: order.number.toString(),
          ready: false,
        }));

        setReadyOrders(ready);
        setInWorkOrders(inWork);
        setTotal(data.total);
        setTotalToday(data.totalToday);
      }
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };

    return () => {
      socket.close();
    };
  }, []);

  const groupOrders = (orders: Order[], groupSize: number) => {
    let groupedOrders: Order[][] = [];
    for (let i = 0; i < orders.length; i += groupSize) {
      groupedOrders.push(orders.slice(i, i + groupSize));
    }
    return groupedOrders;
  };

  const groupedReadyOrders = groupOrders(readyOrders, 10);
  const groupedInWorkOrders = groupOrders(inWorkOrders, 10);

  return (
    <>
      <section className={feedStyles.feedStats}>
        <div className={feedStyles.feedStats__lists}>
          <div>
            <p className="text text_type_main-medium">Готовы:</p>
            <div className={feedStyles.feedStats__grid}>
              {groupedReadyOrders.map((group, groupIndex) => (
                <ul key={groupIndex} className="custom-scroll">
                  {group.map((order, index) => (
                    <li
                      key={index}
                      className={`text text_type_digits-default ${feedStyles.feedStats__lists_ready}`}
                    >
                      {order.id}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">В работе:</p>
            <div className={feedStyles.feedStats__grid}>
              {groupedInWorkOrders.map((group, groupIndex) => (
                <ul key={groupIndex} className="custom-scroll">
                  {group.map((order, index) => (
                    <li
                      key={index}
                      className={`text text_type_digits-default ${feedStyles.feedStats__lists_work}`}
                    >
                      {order.id}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className={feedStyles.feedStats__total_wrapper}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={feedStyles.feedStats__total_wrapper}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </section>
    </>
  );
}

export { FeedStats };
