import { createSlice } from "@reduxjs/toolkit";
import { OrdersState } from "../types/orders.state";
import { getUserOrders } from "./orders.actions";

const initialState: OrdersState = {
  orders: [],
  isPending: {
    orders: false,
  },
  errors: {
    orders: null,
  },
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isPending.orders = true;
        state.errors.orders = null;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.isPending.orders = false;
        state.orders = payload;
      })
      .addCase(getUserOrders.rejected, (state, action: any & { payload: any }) => {
        state.isPending.orders = false;
        state.errors.orders = action.payload.message;
      });
  },
});
