import React from 'react';
<<<<<<< HEAD
import { Header } from './components/header/appHeader';
import { BurgerConstructor } from './components/burgerConstructor/burgerConstructor';
import { BurgerIngredients } from './components/ingredients/burgerIngredients';
import data from './utils/data';
=======
import { Header } from './components/header/appHeader'
import { BurgerConstructor } from './components/burgerConstructor/burgerConstructor'
import { BurgerIngredients } from './components/ingredients/burgerIngredients'
>>>>>>> 3b961f7c143fc2a6fa308fc525392e2960cd3fe2

function App() {
  return (
    <>
<<<<<<< HEAD
      <Header />
      <main>
        <div className='main__inner_content'>
          <BurgerConstructor data={data} />
          <BurgerIngredients />
        </div>
      </main>
=======
    <Header />
    <main>
    <div className='main__inner_content'>
    <BurgerConstructor />
    <BurgerIngredients />
    </div>
    </main>
>>>>>>> 3b961f7c143fc2a6fa308fc525392e2960cd3fe2
    </>
  );
}

export default App;