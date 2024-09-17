import React from "react";
import feedStyles from "../feed/feed.module.css";
import testImage from "../../images/test-img.png";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileOrders() {
  const orders = [
    {
      id: "#034535",
      name: "Death Star Starship Main бургер",
      time: "Сегодня, 16:20",
      price: 480,
      ingredients: [
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
      ],
      status: "Отменен",
    },
    {
      id: "#034537",
      name: "Death бургер",
      time: "Сегодня, 16:21",
      price: 280,
      ingredients: [testImage, testImage, testImage],
      status: "Выполнен",
    },
    {
      id: "#034531",
      name: "Death бургер с сыром",
      time: "Сегодня, 16:21",
      price: 380,
      ingredients: [
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
      ],
      status: "Готовится",
    },
    {
      id: "#034531",
      name: "Death бургер с сыром",
      time: "Сегодня, 16:21",
      price: 380,
      ingredients: [
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
        testImage,
      ],
      status: "Выполнен",
    },
    {
      id: "#034522",
      name: "Death бургер с беконом",
      time: "Сегодня, 16:21",
      price: 380,
      ingredients: [testImage, testImage],
      status: "Создан",
    },
  ];

  return (
    <>
      <ul className={`custom-scroll ${feedStyles.feed__list}`}>
        {orders.map((order, index) => (
          <li key={index}>
            <div className={feedStyles.feed__list_inner_wrapper}>
              <p
                className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
              >
                {order.id}
              </p>
              <p
                className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
              >
                {order.time}
              </p>
            </div>
            <h4
              className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
             style={{
              paddingBottom: 0
             }}>
              {order.name}
            </h4>
            <p className="text text_type_main-default"
              style={{
                color:
                  order.status === "Выполнен"
                    ? "#fff"
                    : order.status === "Готовится"
                    ? "rgba(0, 204, 204, 1)"
                    : order.status === "Создан"
                    ? "#fff"
                    : "#822C23",
                    margin:'1rem 0 1.5rem 0'
              }}
            >
              {order.status}
            </p>
            <div className={feedStyles.feed__list_inner_wrapper}>
              <div className={feedStyles.feed__list_ingredients}>
                {order.ingredients.slice(0, 5).map((ingredient, idx) => (
                  <img
                    key={idx}
                    className={feedStyles.feed__list_ingredient_img}
                    src={ingredient}
                    alt="Ингредиент."
                  />
                ))}
                {order.ingredients.length > 5 && (
                  <div
                    className={
                      feedStyles.feed__list_ingredient_img_more_wrapper
                    }
                  >
                    <img
                      className={feedStyles.feed__list_ingredient_img}
                      src={order.ingredients[5]}
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
                  {order.price}
                </p>
                <CurrencyIcon type={"primary"} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export { ProfileOrders };
