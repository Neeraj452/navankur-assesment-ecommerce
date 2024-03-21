// /src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/login';
import productReducer from './products/product';
import productDetailedReducer from './products/productDetailed';
import cartReducer from './cart/cart';
import  BuyItemReducer from './webhook/buyItems';
export default configureStore({
  reducer: {
    loginReducer,
    productReducer,
    productDetailedReducer,
    cartReducer,
    BuyItemReducer
  },
});
