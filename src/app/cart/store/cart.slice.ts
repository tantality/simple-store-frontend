import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../types/cart.state";
import { createCart, createCartItem, deleteCart, deleteCartItem, getCart, updateCartItem } from "./cart.actions";

const initialState: CartState = {
  cart: null,
  isPending: {
    cart: false,
  },
  errors: {
    cart: null,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get cart
      .addCase(getCart.pending, (state) => {
        state.isPending.cart = true;
        state.errors.cart = null;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.isPending.cart = false;
        state.cart = payload;
      })
      .addCase(getCart.rejected, (state, action: any & { payload: any }) => {
        state.isPending.cart = false;
        state.errors.cart = action.payload.message;
      })
      // Create a cart
      .addCase(createCart.pending, (state) => {
        state.isPending.cart = true;
        state.errors.cart = null;
      })
      .addCase(createCart.fulfilled, (state, { payload }) => {
        state.isPending.cart = false;
        state.cart = payload;
      })
      .addCase(createCart.rejected, (state, action: any & { payload: any }) => {
        state.isPending.cart = false;
        state.errors.cart = action.payload.message;
      })
      // Create a cart item
      .addCase(createCartItem.pending, (state) => {
        state.isPending.cart = true;
        state.errors.cart = null;
      })
      .addCase(createCartItem.fulfilled, (state, { payload }) => {
        state.isPending.cart = false;
        state.cart = payload;
      })
      .addCase(createCartItem.rejected, (state, action: any & { payload: any }) => {
        state.isPending.cart = false;
        state.errors.cart = action.payload.message;
      })
      // Update a cart item
      .addCase(updateCartItem.pending, (state) => {
        state.isPending.cart = true;
        state.errors.cart = null;
      })
      .addCase(updateCartItem.fulfilled, (state, { payload }) => {
        state.isPending.cart = false;
        state.cart = payload;
      })
      .addCase(updateCartItem.rejected, (state, action: any & { payload: any }) => {
        state.isPending.cart = false;
        state.errors.cart = action.payload.message;
      })
      // Delete a cart
      .addCase(deleteCart.pending, (state) => {
        state.isPending.cart = true;
        state.errors.cart = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.isPending.cart = false;
        state.cart = null;
      })
      .addCase(deleteCart.rejected, (state, action: any & { payload: any }) => {
        state.isPending.cart = false;
        state.errors.cart = action.payload.message;
      })
      // Delete a cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.isPending.cart = true;
        state.errors.cart = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, { payload }) => {
        state.isPending.cart = false;
        state.cart = payload;
      })
      .addCase(deleteCartItem.rejected, (state, action: any & { payload: any }) => {
        state.isPending.cart = false;
        state.errors.cart = action.payload.message;
      });
  },
});
