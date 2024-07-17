import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burgerConstructor.module.css';

function BurgerConstructor({ data }) {
  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const mains = data.filter(item => item.type === 'main');

  return (
    <section>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerConstructorStyles.constructor__options}>
        <h3 className={`text text_type_main-default p-4 ${burgerConstructorStyles.focused_option}`}>Булки</h3>
        <h3 className={`text text_type_main-default p-4 ${burgerConstructorStyles.unfocused_option}`}>Соусы</h3>
        <h3 className={`text text_type_main-default p-4 ${burgerConstructorStyles.unfocused_option}`}>Начинки</h3>
      </div>
      <div className={`custom-scroll ${burgerConstructorStyles.constructor__elements_container}`}>
      <h2 className="text text_type_main-medium">Булки</h2>
      <div className={burgerConstructorStyles.constructor__elements_wrapper}> 
        {buns.map(bun => (
          <div key={bun._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`}>
            <img src={bun.image} alt={bun.name}/>
            <div className={burgerConstructorStyles.constructor__element_price_wrapper}>
            <p className={`text text_type_digits-default ${burgerConstructorStyles.constructor__element_price}`}>{bun.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default p-1">{bun.name}</p>
          </div>
        ))}
      </div>
      <h2 className="text text_type_main-medium">Соусы</h2>
      <div className={burgerConstructorStyles.constructor__elements_wrapper}>
        {sauces.map(sauce => (
          <div key={sauce._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`}>
            <img src={sauce.image} alt={sauce.name} />
            <div className={burgerConstructorStyles.constructor__element_price_wrapper}>
            <p className={`text text_type_digits-default ${burgerConstructorStyles.constructor__element_price}`}>{sauce.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default p-1">{sauce.name}</p>
          </div>
        ))}
      </div>
      <h2 className="text text_type_main-medium">Начинки</h2>
      <div className={burgerConstructorStyles.constructor__elements_wrapper}>
        {mains.map(main => (
          <div key={main._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`}>
            <img src={main.image} alt={main.name} />
            <div className={burgerConstructorStyles.constructor__element_price_wrapper}>
            <p className={`text text_type_digits-default ${burgerConstructorStyles.constructor__element_price}`}>{main.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default p-1">{main.name}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export { BurgerConstructor };