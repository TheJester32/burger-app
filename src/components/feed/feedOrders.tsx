import React from "react";
import feedStyles from "./feed.module.css";
import testImage from "../../images/test-img.png";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Feed() {
  return (
    <section className="feed">
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <ul className={`custom-scroll ${feedStyles.feed__list}`}>
        <li>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <p
              className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
            >
              #034535
            </p>
            <p
              className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
            >
              Сегодня, 16:20
            </p>
          </div>
          <h4
            className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
          >
            Death Star Starship Main бургер
          </h4>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <div>
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
            </div>
            <div>
              <p
                className={`text text_type_digits-default ${feedStyles.feed__list_price}`}
              >
                480
              </p>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </li>

        <li>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <p
              className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
            >
              #034535
            </p>
            <p
              className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
            >
              Сегодня, 16:20
            </p>
          </div>
          <h4
            className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
          >
            Death Star Starship Main бургер
          </h4>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <div>
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
            </div>
            <div>
              <p
                className={`text text_type_digits-default ${feedStyles.feed__list_price}`}
              >
                480
              </p>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </li>
        <li>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <p
              className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
            >
              #034535
            </p>
            <p
              className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
            >
              Сегодня, 16:20
            </p>
          </div>
          <h4
            className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
          >
            Death Star Starship Main бургер
          </h4>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <div>
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
            </div>
            <div>
              <p
                className={`text text_type_digits-default ${feedStyles.feed__list_price}`}
              >
                480
              </p>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </li>
        <li>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <p
              className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
            >
              #034535
            </p>
            <p
              className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
            >
              Сегодня, 16:20
            </p>
          </div>
          <h4
            className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
          >
            Death Star Starship Main бургер
          </h4>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <div>
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
            </div>
            <div>
              <p
                className={`text text_type_digits-default ${feedStyles.feed__list_price}`}
              >
                480
              </p>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </li>
        <li>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <p
              className={`text text_type_digits-default ${feedStyles.feed__list_number}`}
            >
              #034535
            </p>
            <p
              className={`text text_type_main-default text_color_inactive ${feedStyles.feed__list_time}`}
            >
              Сегодня, 16:20
            </p>
          </div>
          <h4
            className={`text text_type_main-medium ${feedStyles.feed__list_name}`}
          >
            Death Star Starship Main бургер
          </h4>
          <div className={feedStyles.feed__list_inner_wrapper}>
            <div>
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
              <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
                            <img
                className={feedStyles.feed__list_ingredient_img}
                src={testImage}
                alt="Ингредиент."
              />
            </div>
            <div>
              <p
                className={`text text_type_digits-default ${feedStyles.feed__list_price}`}
              >
                480
              </p>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </li>
        

    
      </ul>
    </section>
  );
}

export { Feed };
