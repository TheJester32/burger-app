import { createSlice, PayloadAction, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/api";

export interface Order {
  _id: string;
  number: number;
  createdAt: string;
  name: string;
  ingredients: string[];
  status: string;
}

interface Ingredient {
  name: string;
  _id: string;
  image: string;
  price: number;
}

interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
  ingredients: { [key: string]: { image: string; price: number } };
  ingredientsLoading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
  ingredients: {},
  ingredientsLoading: false,
};

interface SetOrdersPayload {
  orders: Order[];
  total: number;
  totalToday: number;
}

interface WsMessagePayload {
  orders: Order[];
  total: number;
  totalToday: number;
}
export const wsMessageAction = createAction<WsMessagePayload>('feedOrders/wsMessage');

export const fetchIngredientData = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("orders/fetchIngredientData", async () => {
  const response = await fetch(`${BASE_URL}/ingredients`);
  const data = await response.json();
  return data.data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<SetOrdersPayload>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    connectWebSocket(state) {
      state.loading = true;
    },
    disconnectWebSocket(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(wsMessageAction, (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
      state.loading = false;
    })
      .addCase(fetchIngredientData.pending, (state) => {
        state.ingredientsLoading = true;
      })
      .addCase(fetchIngredientData.fulfilled, (state, action) => {
        const ingredientMap: {
          [key: string]: { image: string; price: number };
        } = {};
        action.payload.forEach((ingredient) => {
          ingredientMap[ingredient._id] = {
            image: ingredient.image,
            price: ingredient.price,
          };
        });

        state.ingredients = ingredientMap;
        state.ingredientsLoading = false;
      })
      .addCase(fetchIngredientData.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.error =
          action.error.message || "Ошибка при загрузке ингредиентов";
      });
  },
});

export const {
  setOrders,
  setLoading,
  setError,
  connectWebSocket,
  disconnectWebSocket,
} = ordersSlice.actions;
export default ordersSlice.reducer;
