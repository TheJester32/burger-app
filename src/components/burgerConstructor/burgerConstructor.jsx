import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burgerConstructor.module.css';

function BurgerConstructor({ data }) {
  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const mains = data.filter(item => item.type === 'main');

  BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  };

  return (
    <section>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerConstructorStyles.constructor__options}>
        <h3 className={`text text_type_main-default p-4 ${burgerConstructorStyles.focused_option}`}>Булки</h3>
        <h3 className={`text text_type_main-default p-4 ${burgerConstructorStyles.unfocused_option}`}>Соусы</h3>
        <h3 className={`text text_type_main-default p-4 ${burgerConstructorStyles.unfocused_option}`}>Начинки</h3>
      </div>
      <ul className={`custom-scroll ${burgerConstructorStyles.constructor__elements_container}`}>
        <li className="text text_type_main-medium">Булки</li>
        <div className={burgerConstructorStyles.constructor__elements_wrapper}>
          {buns.map(bun => (
            <li key={bun._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`}>
              <Counter count={0} size="default" extraClass="m-1" />
              <img src={bun.image} alt={bun.name} />
              <div className={burgerConstructorStyles.constructor__element_price_wrapper}>
                <p className={`text text_type_digits-default ${burgerConstructorStyles.constructor__element_price}`}>{bun.price}</p>
                <CurrencyIcon />
              </div>
              <p className="text text_type_main-default p-1">{bun.name}</p>
            </li>
          ))}
        </div>
        <li className="text text_type_main-medium">Соусы</li>
        <div className={burgerConstructorStyles.constructor__elements_wrapper}>
          {sauces.map(sauce => (
            <li key={sauce._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`}>
              <Counter count={0} size="default" extraClass="m-1" />
              <img src={sauce.image} alt={sauce.name} />
              <div className={burgerConstructorStyles.constructor__element_price_wrapper}>
                <p className={`text text_type_digits-default ${burgerConstructorStyles.constructor__element_price}`}>{sauce.price}</p>
                <CurrencyIcon />
              </div>
              <p className="text text_type_main-default p-1">{sauce.name}</p>
            </li>
          ))}
        </div>
        <li className="text text_type_main-medium">Начинки</li>
        <div className={burgerConstructorStyles.constructor__elements_wrapper}>
          {mains.map(main => (
            <li key={main._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`}>
              <img src={main.image} alt={main.name} />
              <div className={burgerConstructorStyles.constructor__element_price_wrapper}>
                <p className={`text text_type_digits-default ${burgerConstructorStyles.constructor__element_price}`}>{main.price}</p>
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

export { BurgerConstructor };
