import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "api/axios.client";
import { GetUserOrdersQueryDto } from "../types/get-user-orders-query.dto";
import { OrderDto } from "../types/order.dto";

export const getUserOrders = createAsyncThunk<OrderDto[], { query: GetUserOrdersQueryDto }>(
  "GET/user-orders",
  async ({ query = {} }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/orders", {
        params: {
          ...query,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
