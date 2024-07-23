import React, { useEffect, useState } from 'react';
import { Header } from '../header/appHeader';
import { BurgerConstructor } from '../burgerConstructor/burgerConstructor';
import { BurgerIngredients } from '../ingredients/burgerIngredients';
import appStyles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {isLoading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}
      {data && (
        <>
          <Header />
          <main className={appStyles.main}>
            <div className={appStyles.main__inner_content}>
              <BurgerConstructor data={data} />
              <BurgerIngredients data={data} />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;