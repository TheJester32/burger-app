import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';

export interface Order {
    _id: string;
    number: number;
    createdAt: string;
    name: string;
    ingredients: string[];
    status: string;
}

interface ProfileOrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    ingredientData: { [key: string]: { image: string; price: number; name: string } };
}

const initialState: ProfileOrdersState = {
    orders: [],
    loading: false,
    error: null,
    ingredientData: {},
};

interface Ingredient {
    name: string;
    _id: string;
    image: string;
    price: number;
}

export const fetchIngredientData = createAsyncThunk<
    Ingredient[],
    void,
    { rejectValue: string }
>("orders/fetchIngredientData", async () => {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const data = await response.json();
    return data.data;
});

const profileOrdersSlice = createSlice({
    name: 'profileOrders',
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
        },
        startConnection(state) {
            state.loading = true;
        },
        closeConnection(state) {
            state.loading = false;
        },
        updateOrders(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredientData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredientData.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
                const ingredientData = action.payload.reduce((acc, ingredient) => {
                    acc[ingredient._id] = {
                        image: ingredient.image,
                        price: ingredient.price,
                        name: ingredient.name,
                    };
                    return acc;
                }, {} as { [key: string]: { image: string; price: number; name: string } });

                state.ingredientData = ingredientData;
                state.loading = false;
            })
            .addCase(fetchIngredientData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при загрузке данных ингредиентов';
            });
    },
});

export const { setOrders, setLoading, setError, clearOrders, startConnection, closeConnection, updateOrders } = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
