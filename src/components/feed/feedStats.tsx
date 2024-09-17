import React from "react";
import feedStyles from "./feed.module.css";

type Order = {
  id: string;
  ready: boolean;
};

function FeedStats() {
  const orders: Order[] = [
    { id: "034535", ready: true },
    { id: "034537", ready: false },
    { id: "034531", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: true },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034537", ready: false },
    { id: "034535", ready: true },
    { id: "034535", ready: true },
    { id: "034535", ready: true },
  ];

  const groupOrders = (orders: Order[], groupSize: number) => {
    let groupedOrders: Order[][] = [];
    for (let i = 0; i < orders.length; i += groupSize) {
      groupedOrders.push(orders.slice(i, i + groupSize));
    }
    return groupedOrders;
  };

  const readyOrders = orders.filter((order) => order.ready === true);
  const inWorkOrders = orders.filter((order) => order.ready === false);

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
                <ul key={groupIndex}>
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
                <ul key={groupIndex}>
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
          <p className="text text_type_digits-large">28 752</p>
        </div>
        <div className={feedStyles.feedStats__total_wrapper}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">138</p>
        </div>
      </section>
    </>
  );
}

export { FeedStats };
