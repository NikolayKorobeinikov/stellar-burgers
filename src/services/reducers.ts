import { combineReducers } from 'redux';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';
import { feedReducer } from './slices/feedSlice';
import { orderHistoryReducer } from './slices/orderHistorySlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  orderHistory: orderHistoryReducer
});
