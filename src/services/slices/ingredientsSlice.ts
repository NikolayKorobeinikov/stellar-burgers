import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

type TIngredientsState = {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  currentIngredient: null,
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
