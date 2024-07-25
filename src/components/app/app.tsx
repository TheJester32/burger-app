import React, { useEffect, useState } from 'react';
import { Header } from '../header/appHeader';
import { BurgerConstructor } from '../burgerConstructor/burgerConstructor';
import { BurgerIngredients } from '../ingredients/burgerIngredients';
import appStyles from './app.module.css';
import Modal from '../modals/modal';
import IngredientDetails from '../modals/ingredientModal/ingredientDetails';
import OrderDetails from '../modals/orderModal/orderDetails';
import { ingredientType } from '../../utils/tsTypes';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState<ingredientType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<ingredientType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Сервер не отвечает');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIngredientDetailsOpen = (ingredient: ingredientType) => {
    setSelectedIngredient(ingredient);
    setShowIngredientModal(true);
  };

  const handleIngredientDetailsClose = () => {
    setShowIngredientModal(false);
    setSelectedIngredient(null);
  };

  const handleOrderDetailsOpen = () => {
    setShowOrderModal(true);
  };

  const handleOrderDetailsClose = () => {
    setShowOrderModal(false);
  };

  return (
    <>
      <Header />
      {isLoading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}
      {data && (
        <>
          <main className={appStyles.main}>
            <div className={appStyles.main__inner_content}>
              <BurgerConstructor data={data} handleIngredientDetailsOpen={handleIngredientDetailsOpen} />
              <BurgerIngredients data={data} handleOrderDetailsOpen={handleOrderDetailsOpen} />
            </div>
          </main>
          {showIngredientModal && selectedIngredient && (
            <Modal isOpen={showIngredientModal} handleClose={handleIngredientDetailsClose}>
              <IngredientDetails ingredient={selectedIngredient} />
            </Modal>
          )}
          {showOrderModal && (
            <Modal isOpen={showOrderModal} handleClose={handleOrderDetailsClose}>
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default App;
