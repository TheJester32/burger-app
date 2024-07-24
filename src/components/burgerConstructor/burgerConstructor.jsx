import React, { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burgerConstructor.module.css';
import { ingredientType } from '../../utils/types';
import OrderDetailsModal from '../modals/orderDetails';

function BurgerConstructor({ data }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleOpen = (ingredient) => {
    setSelectedIngredient(ingredient);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedIngredient(null);
  };

  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const mains = data.filter(item => item.type === 'main');

  BurgerConstructor.propTypes = ingredientType;

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
            <li key={bun._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`} onClick={() => handleOpen(bun)}>
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
            <li key={sauce._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`} onClick={() => handleOpen(sauce)}>
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
            <li key={main._id} className={`p-3 ${burgerConstructorStyles.constructor__element_wrap}`} onClick={() => handleOpen(main)}>
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
      {selectedIngredient && (
        <OrderDetailsModal isOpen={isModalOpen} handleClose={handleClose}>
          <div className={`${burgerConstructorStyles.constructor__modal_wrapper}`}>
            <h3 className='text text_type_main-large'>Детали ингредиента</h3>
            <div className={burgerConstructorStyles.constructor__modal_inner}>
              <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
              <p className='text text_type_main-medium'>{selectedIngredient.name}</p>
              <div className={burgerConstructorStyles.constructor__modal_inner_description_wrapper}>
                <div>
                  <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                  <p className="text text_type_digits-default text_color_inactive p-4">{selectedIngredient.calories}</p>
                </div>
                <div>
                  <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                  <p className="text text_type_digits-default text_color_inactive  p-4">{selectedIngredient.proteins}</p>
                </div>
                <div>
                  <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                  <p className="text text_type_digits-default text_color_inactive  p-4">{selectedIngredient.fat}</p>
                </div>
                <div>
                  <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                  <p className="text text_type_digits-default text_color_inactive  p-4">{selectedIngredient.carbohydrates}</p>
                </div>
              </div>
            </div>
          </div>
        </OrderDetailsModal>
      )}
    </section>
  );
}

export { BurgerConstructor };