import { combineReducers } from 'redux';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';

const feedReducer = (state = { orders: [] }) => state;
const orderHistoryReducer = (state = { orders: [] }) => state;

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  orderHistory: orderHistoryReducer
});