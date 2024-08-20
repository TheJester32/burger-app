import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import userReducer from '../reducers/userSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
});

export default rootReducer;
