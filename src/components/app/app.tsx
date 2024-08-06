import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../header/appHeader';
import { BurgerIngredients } from '../burgerIngredients/burgerIngredients';
import { BurgerConstructor } from '../burgerConstructor/burgerConstructor';
import appStyles from './app.module.css';
import Modal from '../modals/modal';
import { ingredientType } from '../../utils/tsTypes';
import IngredientDetails from '../modals/ingredientModal/ingredientDetails';
import OrderDetails from '../modals/orderModal/orderDetails';
import { fetchIngredients, setViewedIngredient, createOrder, setBun, addConstructorIngredient } from '../../store/reducers/ingredientsSlice';
import { RootState, AppDispatch } from '../../store/store';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { allIngredients, buns, constructorIngredients, viewedIngredient, orderNumber, loading, error } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientDetailsOpen = (ingredient: ingredientType) => {
    dispatch(setViewedIngredient(ingredient));
  };

  const handleIngredientDetailsClose = () => {
    dispatch(setViewedIngredient(null as any));
  };

  const handleOrderDetailsOpen = () => {
    const ingredients = [
      ...buns,
      ...constructorIngredients
    ];
    dispatch(createOrder(ingredients));
  };

  const handleIngredientDrop = (id: string) => {
    const ingredient = allIngredients.find(ing => ing._id === id);
    if (ingredient) {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addConstructorIngredient(ingredient));
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      {loading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}
      {allIngredients.length > 0 && (
        <>
          <main className={appStyles.main}>
            <div className={appStyles.main__inner_content}>
              <BurgerIngredients
                data={allIngredients}
                handleIngredientDetailsOpen={handleIngredientDetailsOpen}
              />
              <BurgerConstructor
                data={[...buns, ...constructorIngredients]}
                handleOrderDetailsOpen={handleOrderDetailsOpen}
                handleIngredientDrop={handleIngredientDrop}
              />
            </div>
          </main>
          {viewedIngredient && (
            <Modal isOpen={Boolean(viewedIngredient)} handleClose={handleIngredientDetailsClose}>
              <IngredientDetails ingredient={viewedIngredient} />
            </Modal>
          )}
          {orderNumber && (
            <Modal isOpen={Boolean(orderNumber)} handleClose={() => dispatch(createOrder([]))}>
              <OrderDetails orderNumber={orderNumber} />
            </Modal>
          )}
        </>
      )}
    </DndProvider>
  );
}

export default App;
