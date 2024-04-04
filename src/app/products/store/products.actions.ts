import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "api/axios.client";
import { GetAllProductsQueryDto } from "../types/get-all-products-query.dto";
import { ProductsDto } from "../types/products.dto";

export const getAllProducts = createAsyncThunk<ProductsDto, { query?: Partial<GetAllProductsQueryDto> }>(
  "GET/all-products",
  async ({ query = {} }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/products", {
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
