import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/products.state";
import { getAllProducts } from "./products.actions";

const initialState: ProductState = {
  count: null,
  products: [],
  isPending: {
    count: false,
    products: false,
  },
  errors: {
    count: null,
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
        state.isPending.count = true;
        state.errors.products = null;
        state.errors.count = null;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isPending.products = false;
        state.isPending.count = false;
        state.products = payload.products;
        state.count = payload.count;
      })
      .addCase(getAllProducts.rejected, (state, action: any & { payload: any }) => {
        state.isPending.products = false;
        state.isPending.count = false;
        state.errors.products = action.payload.message;
        state.errors.count = action.payload.message;
      });
  },
});
