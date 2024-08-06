import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { ingredientType } from '../../utils/types';

function BurgerIngredients({ data, handleIngredientDetailsOpen }) {
  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const mains = data.filter(item => item.type === 'main');

  BurgerIngredients.propTypes = ingredientType;

  return (
    <section>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.constructor__options}>
        <h3 className={`text text_type_main-default p-4 ${burgerIngredientsStyles.focused_option}`}>Булки</h3>
        <h3 className={`text text_type_main-default p-4 ${burgerIngredientsStyles.unfocused_option}`}>Соусы</h3>
        <h3 className={`text text_type_main-default p-4 ${burgerIngredientsStyles.unfocused_option}`}>Начинки</h3>
      </div>
      <ul className={`custom-scroll ${burgerIngredientsStyles.constructor__elements_container}`}>
        <li className="text text_type_main-medium">Булки</li>
        <div className={burgerIngredientsStyles.constructor__elements_wrapper}>
          {buns.map(bun => (
            <li key={bun._id} className={`p-3 ${burgerIngredientsStyles.constructor__element_wrap}`} onClick={() => handleIngredientDetailsOpen(bun)}>
              <Counter count={0} size="default" extraClass="m-1" />
              <img src={bun.image} alt={bun.name} />
              <div className={burgerIngredientsStyles.constructor__element_price_wrapper}>
                <p className={`text text_type_digits-default ${burgerIngredientsStyles.constructor__element_price}`}>{bun.price}</p>
                <CurrencyIcon />
              </div>
              <p className="text text_type_main-default p-1">{bun.name}</p>
            </li>
          ))}
        </div>
        <li className="text text_type_main-medium">Соусы</li>
        <div className={burgerIngredientsStyles.constructor__elements_wrapper}>
          {sauces.map(sauce => (
            <li key={sauce._id} className={`p-3 ${burgerIngredientsStyles.constructor__element_wrap}`} onClick={() => handleIngredientDetailsOpen(sauce)}>
              <Counter count={0} size="default" extraClass="m-1" />
              <img src={sauce.image} alt={sauce.name} />
              <div className={burgerIngredientsStyles.constructor__element_price_wrapper}>
                <p className={`text text_type_digits-default ${burgerIngredientsStyles.constructor__element_price}`}>{sauce.price}</p>
                <CurrencyIcon />
              </div>
              <p className="text text_type_main-default p-1">{sauce.name}</p>
            </li>
          ))}
        </div>
        <li className="text text_type_main-medium">Начинки</li>
        <div className={burgerIngredientsStyles.constructor__elements_wrapper}>
          {mains.map(main => (
            <li key={main._id} className={`p-3 ${burgerIngredientsStyles.constructor__element_wrap}`} onClick={() => handleIngredientDetailsOpen(main)}>
              <img src={main.image} alt={main.name} />
              <div className={burgerIngredientsStyles.constructor__element_price_wrapper}>
                <p className={`text text_type_digits-default ${burgerIngredientsStyles.constructor__element_price}`}>{main.price}</p>
                <CurrencyIcon />
              </div>
              <p className="text text_type_main-default p-1">{main.name}</p>
            </li>
          ))}
        </div>
      </ul>
    </section>
  );
}

export { BurgerIngredients };