import { Order } from "../../../services/reducers/feedOrdersSlice";
import orderDetailsStyles from "../feedOrderModal/feedOrderDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientImages {
  [key: string]: { image: string; price: number; name: string };
}

interface OrderProps {
  order: Order;
  ingredientData: IngredientImages;
}

function ProfileOrderDetails({ order, ingredientData }: OrderProps) {
  if (!order) {
    return <p>Заказ не найден</p>;
  }

  const ingredientCounts = order.ingredients.reduce<Record<string, number>>(
    (acc, id) => {
      if (acc[id]) {
        acc[id] += 1;
      } else {
        acc[id] = 1;
      }
      return acc;
    },
    {}
  );

  const calculateTotalPrice = () => {
    return Object.entries(ingredientCounts).reduce((total, [id, count]) => {
      const ingredient = ingredientData[id];
      return ingredient ? total + ingredient.price * count : total;
    }, 0);
  };

  return (
    <>
      <p
        className={`text text_type_digits-default ${orderDetailsStyles.orderDetails_number}`}
        style={{ marginTop: "1rem" }}
      >
        #{order.number}
      </p>
      <div className={`${orderDetailsStyles.orderDetails_inner_wrapper}`}>
        <p
          className={`text text_type_main-medium ${orderDetailsStyles.orderDetails_name}`}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          {order.name}
        </p>
        <p
          style={{
            color:
              order.status === "done"
                ? "#fff"
                : order.status === "pending"
                ? "#5AC9CA"
                : "#D43E2B",
            marginTop: "1rem",
            marginBottom: "3rem",
          }}
          className="text text_type_main-default"
        >
          {order.status === "done"
            ? "Выполнен"
            : order.status === "pending"
            ? "Готовится"
            : "Не выполнен"}
        </p>
        <h4 className="text text_type_main-medium">Состав:</h4>
        <ul className={`${orderDetailsStyles.orderDetails_list} custom-scroll`}>
          {Object.entries(ingredientCounts).map(([ingredientId, count]) => (
            <li key={ingredientId}>
              <div className={orderDetailsStyles.orderDetails_img_wrapper}>
                <img
                  src={ingredientData[ingredientId]?.image}
                  alt="Ингредиент"
                />
              </div>
              <h4
                className="text text_type_main-medium"
                style={{ width: "100%", maxWidth: '500px' }}
              >
                {ingredientData[ingredientId]?.name}
              </h4>
              <p
                className="text text_type_digits-default"
              >
                x{count}
              </p>
              <div className={orderDetailsStyles.orderDetails_count_wrapper}>
                <p
                  className="text text_type_digits-default"
                >
                  {ingredientData[ingredientId]?.price * count}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
        <div className={orderDetailsStyles.orderDetails_lower_wrapper}>
          <p className="text text_type_digits-default text_color_inactive">
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <div className={`${orderDetailsStyles.orderDetails_price_wrapper}`}>
            <p
              className="text text_type_digits-default"
              style={{ marginRight: "1rem" }}
            >
              {calculateTotalPrice()}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export { ProfileOrderDetails };