import React from 'react';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { useSelector } from 'react-redux';

function BurgerIngredients({ data, handleIngredientDetailsOpen }) {
  const constructorIngredients = useSelector(state => state.ingredients.constructorIngredients);
  const buns = useSelector(state => state.ingredients.buns);

  const getIngredientCount = (id) => {
    let count = 0;
    if (buns.some(bun => bun._id === id)) {
      count += 1;
    }
    constructorIngredients.forEach(item => {
      if (item._id === id) {
        count++;
      }
    });
    return count;
  };

  const Ingredient = ({ item }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'ingredient',
      item: { id: item._id, type: item.type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <li
        ref={drag}
        key={item._id}
        className={`p-3 ${burgerIngredientsStyles.constructor__element_wrap}`}
        onClick={() => handleIngredientDetailsOpen(item)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <Counter count={getIngredientCount(item._id)} size="default" extraClass="m-1" />
        <img src={item.image} alt={item.name} />
        <div className={burgerIngredientsStyles.constructor__element_price_wrapper}>
          <p className={`text text_type_digits-default ${burgerIngredientsStyles.constructor__element_price}`}>{item.price}</p>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default p-1">{item.name}</p>
      </li>
    );
  };

  const bunsData = data.filter(item => item.type === 'bun');
  const saucesData = data.filter(item => item.type === 'sauce');
  const mainsData = data.filter(item => item.type === 'main');

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
          {bunsData.map(bun => (
            <Ingredient key={bun._id} item={bun} />
          ))}
        </div>
        <li className="text text_type_main-medium">Соусы</li>
        <div className={burgerIngredientsStyles.constructor__elements_wrapper}>
          {saucesData.map(sauce => (
            <Ingredient key={sauce._id} item={sauce} />
          ))}
        </div>
        <li className="text text_type_main-medium">Начинки</li>
        <div className={burgerIngredientsStyles.constructor__elements_wrapper}>
          {mainsData.map(main => (
            <Ingredient key={main._id} item={main} />
          ))}
        </div>
      </ul>
    </section>
  );
}

export { BurgerIngredients };