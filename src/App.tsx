import React from 'react';
import { Header } from './components/header/appHeader'
import { BurgerConstructor } from './components/burgerConstructor/burgerConstructor'
import { BurgerIngredients } from './components/ingredients/burgerIngredients'

function App() {
  return (
    <>
    <Header />
    <main>
    <div className='main__inner_content'>
    <BurgerConstructor />
    <BurgerIngredients />
    </div>
    </main>
    </>
  )
}

export default App;
