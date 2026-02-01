import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrderHistory = createAsyncThunk(
  'orderHistory/fetchOrderHistory',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

type TOrderHistoryState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrderHistoryState = {
  orders: [],
  loading: false,
  error: null
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  }
});

export const orderHistoryReducer = orderHistorySlice.reducer;
