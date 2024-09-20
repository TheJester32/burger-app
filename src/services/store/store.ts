import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { loadState, saveState } from '../../utils/localStorage';
import wsFeedMiddleware from '../middlewares/wsFeedMiddleWare';

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(wsFeedMiddleware),
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
