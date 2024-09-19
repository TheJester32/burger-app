import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
}

const initialState: ProfileOrdersState = {
    orders: [],
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
    },
});

export const { setOrders, setLoading, setError, clearOrders } = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;