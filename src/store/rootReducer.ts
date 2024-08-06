import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});

export default rootReducer;