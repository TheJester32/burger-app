import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';

export interface Order {
    _id: string;
    number: number;
    createdAt: string;
    name: string;
    ingredients: string[];
    status: string
  }

interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
};

export async function fetchIngredientData(): Promise<{ [key: string]: { image: string, price: number } }> {
  const response = await fetch(`${BASE_URL}/ingredients`);
  const data = await response.json();
  const ingredientMap: { [key: string]: { image: string, price: number } } = {};
  
  data.data.forEach((ingredient: { _id: string, image: string, price: number }) => {
      ingredientMap[ingredient._id] = { image: ingredient.image, price: ingredient.price };
  });

  return ingredientMap;
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
  },
});

export const { setOrders, setLoading, setError, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
