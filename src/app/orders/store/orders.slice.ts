import { createSlice } from "@reduxjs/toolkit";
import { OrdersState } from "../types/orders.state";
import { getUserOrders } from "./orders.actions";

const initialState: OrdersState = {
  count: null,
  orders: [],
  isPending: {
    count: false,
    orders: false,
  },
  errors: {
    count: null,
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
        state.isPending.count = true;
        state.errors.orders = null;
        state.errors.count = null;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.isPending.orders = false;
        state.isPending.count = false;
        state.orders = payload.orders;
        state.count = payload.count;
      })
      .addCase(getUserOrders.rejected, (state, action: any & { payload: any }) => {
        state.isPending.orders = false;
        state.isPending.count = false;
        state.errors.orders = action.payload.message;
        state.errors.count = action.payload.message;
      });
  },
});
