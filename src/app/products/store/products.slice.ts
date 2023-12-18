import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/products.state";
import { getAllProducts } from "./products.actions";

const initialState: ProductState = {
  products: [],
  isPending: {
    products: false,
  },
  errors: {
    products: null,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isPending.products = true;
        state.errors.products = null;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isPending.products = false;
        state.products = payload;
      })
      .addCase(getAllProducts.rejected, (state, action: any & { payload: any }) => {
        state.isPending.products = false;
        state.errors.products = action.payload.message;
      });
  },
});
