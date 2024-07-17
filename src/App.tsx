import React from 'react';
import { Header } from './components/header/appHeader';
import { BurgerConstructor } from './components/burgerConstructor/burgerConstructor';
import { BurgerIngredients } from './components/ingredients/burgerIngredients';
import data from './utils/data';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className='main__inner_content'>
          <BurgerConstructor data={data} />
          <BurgerIngredients />
        </div>
      </main>
    </>
  );
}

export default App;