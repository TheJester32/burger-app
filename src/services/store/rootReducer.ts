import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../reducers/ingredientsSlice';
import userReducer from '../reducers/userSlice';
import ordersReducer from '../reducers/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  orders: ordersReducer,
});

export default rootReducer;
