import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import globalReducer from './reducers/globalReducer';
import authService from './services/authService';
import categoryService from './services/categoryService';
import homeProductsService from './services/homeProductsService';
import orderService from './services/orderService';
import paymentService from './services/paymentService';
import productService from './services/productService';
import userOrdersService from './services/userOrdersService';

const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProductsService.reducerPath]: homeProductsService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [orderService.reducerPath]: orderService.reducer,
    [userOrdersService.reducerPath]: userOrdersService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(categoryService.middleware)
      .concat(productService.middleware)
      .concat(homeProductsService.middleware)
      .concat(paymentService.middleware)
      .concat(orderService.middleware)
      .concat(userOrdersService.middleware),
});

export default store;
