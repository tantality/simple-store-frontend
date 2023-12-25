import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuthClient } from "api/axios.client";
import { GetUserOrdersQueryDto } from "../types/get-user-orders-query.dto";
import { OrdersDto } from "../types/orders.dto";

export const getUserOrders = createAsyncThunk<OrdersDto, { query: GetUserOrdersQueryDto }>(
  "GET/user-orders",
  async ({ query = {} }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthClient.get("/orders", {
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
