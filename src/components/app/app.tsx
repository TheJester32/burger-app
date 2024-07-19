import React from 'react';
import { Header } from '../header/appHeader';
import { BurgerConstructor } from '../burgerConstructor/burgerConstructor';
import { BurgerIngredients } from '../ingredients/burgerIngredients';
import data from '../../utils/data';
import appStyles from './app.module.css';


function App() {
  return (
    <>
      <Header />
      <main className={appStyles.main}>
        <div className={appStyles.main__inner_content}>
          <BurgerConstructor data={data} />
          <BurgerIngredients data={data}/>
        </div>
      </main>
    </>
  );
}

export default App;