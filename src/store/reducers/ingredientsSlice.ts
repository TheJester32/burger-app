import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ingredientType } from '../../utils/tsTypes';

interface IngredientsState {
  allIngredients: ingredientType[];
  buns: ingredientType[];
  constructorIngredients: ingredientType[];
  viewedIngredient: ingredientType | null;
  createdOrder: any;
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  allIngredients: [],
  buns: [],
  constructorIngredients: [],
  viewedIngredient: null,
  createdOrder: null,
  orderNumber: null,
  loading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
  if (!response.ok) {
    throw new Error('Сервер не отвечает');
  }
  const data = await response.json();
  return data.data;
});

export const createOrder = createAsyncThunk('ingredients/createOrder', async (ingredients: ingredientType[]) => {
  const response = await fetch('https://norma.nomoreparties.space/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });
  if (!response.ok) {
    throw new Error('Не удалось создать заказ');
  }
  const data = await response.json();
  return data.order.number;
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setViewedIngredient(state, action: PayloadAction<ingredientType | null>) {
      state.viewedIngredient = action.payload;
    },
    setBun(state, action: PayloadAction<ingredientType>) {
      const bunWithUUID = { ...action.payload, uuid: uuidv4() };
      state.buns = [bunWithUUID];
    },
    addConstructorIngredient(state, action: PayloadAction<ingredientType>) {
      const ingredientWithUUID = { ...action.payload, uuid: uuidv4() };
      state.constructorIngredients.push(ingredientWithUUID);
    },
    removeConstructorIngredient(state, action: PayloadAction<string>) {
      const index = state.constructorIngredients.findIndex(ingredient => ingredient.uuid === action.payload);
      if (index !== -1) {
        state.constructorIngredients.splice(index, 1);
      }
    },
    reorderConstructorIngredients(state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) {
      const { fromIndex, toIndex } = action.payload;
      const [movedIngredient] = state.constructorIngredients.splice(fromIndex, 1);
      state.constructorIngredients.splice(toIndex, 0, movedIngredient);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<ingredientType[]>) => {
        state.loading = false;
        state.allIngredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении ингредиентов';
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.orderNumber = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании заказа';
      });
  },
});

export const { setViewedIngredient, setBun, addConstructorIngredient, removeConstructorIngredient, reorderConstructorIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
