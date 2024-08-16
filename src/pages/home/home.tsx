import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerIngredients } from '../../components/burgerIngredients/burgerIngredients';
import { BurgerConstructor } from '../../components/burgerConstructor/burgerConstructor';
import Modal from '../../components/modals/modal';
import IngredientDetails from '../../components/modals/ingredientModal/ingredientDetails';
import OrderDetails from '../../components/modals/orderModal/orderDetails';
import {
  fetchIngredients,
  setViewedIngredient,
  createOrder,
  setBun,
  addConstructorIngredient,
  removeConstructorIngredient,
  reorderConstructorIngredients,
  resetOrderNumber,
  clearConstructor
} from '../../services/reducers/ingredientsSlice';
import { RootState, AppDispatch } from '../../services/store/store';
import { ingredientType } from '../../utils/tsTypes';

export const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    allIngredients,
    buns,
    constructorIngredients,
    viewedIngredient,
    orderNumber,
    loading,
    error
  } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientDetailsOpen = (ingredient: ingredientType | null) => {
    dispatch(setViewedIngredient(ingredient));
  };

  const handleIngredientDetailsClose = () => {
    dispatch(setViewedIngredient(null));
  };

  const handleOrderDetailsOpen = () => {
    const ingredients = [...buns, ...constructorIngredients];
    dispatch(createOrder(ingredients)).then((action) => {
      if (createOrder.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
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

  const handleRemove = (id: string) => {
    dispatch(removeConstructorIngredient(id));
  };

  const handleReorder = (fromIndex: any, toIndex: any) => {
    dispatch(reorderConstructorIngredients({ fromIndex, toIndex }));
  };

  return (
    <>
      {loading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}
      {allIngredients.length > 0 && (
        <>
              <BurgerIngredients
                data={allIngredients}
                handleIngredientDetailsOpen={handleIngredientDetailsOpen}
              />
              <BurgerConstructor
                data={[...buns, ...constructorIngredients]}
                handleOrderDetailsOpen={handleOrderDetailsOpen}
                handleIngredientDrop={handleIngredientDrop}
                handleRemove={handleRemove}
                handleReorder={handleReorder}
              />
          {viewedIngredient && (
            <Modal isOpen={Boolean(viewedIngredient)} handleClose={handleIngredientDetailsClose}>
              <IngredientDetails ingredient={viewedIngredient} />
            </Modal>
          )}
          {orderNumber && (
            <Modal isOpen={Boolean(orderNumber)} handleClose={() => dispatch(resetOrderNumber())}>
              <OrderDetails orderNumber={orderNumber} />
            </Modal>
          )}
        </>
      )}
    </>
  );
};