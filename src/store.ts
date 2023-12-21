import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "app/auth/store/auth.slice";
import { cartSlice } from "app/cart/store/cart.slice";
import { productsSlice } from "app/products/store/products.slice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
