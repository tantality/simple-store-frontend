import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuthClient } from "api/axios.client";
import { CartItemParamsDto } from "../types/cart-item-params.dto";
import { CartParamsDto } from "../types/cart-params.dto";
import { CartDto } from "../types/cart.dto";
import { CreateCartItemForm } from "../types/create-cart-item.form";
import { CreateCartForm } from "../types/create-cart.form";
import { UpdateCartItemForm } from "../types/update-cart-item.form";

export const getCart = createAsyncThunk<CartDto>("GET/get-cart", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.get<CartDto>("/orders/cart");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createCart = createAsyncThunk<CartDto, { body: CreateCartForm }>("POST/create-cart", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.post<CartDto>("/orders", body);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createCartItem = createAsyncThunk<CartDto, { params: CartParamsDto; body: CreateCartItemForm }>(
  "POST/create-cart-item",
  async ({ body, params }, { rejectWithValue }) => {
    try {
      const { cartId } = params;
      const response = await axiosAuthClient.post<CartDto>(`/orders/${cartId}/items`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const placeOrder = createAsyncThunk<CartDto, { params: CartParamsDto }>(
  "PUT/place-an-order",
  async ({ params }, { rejectWithValue }) => {
    try {
      const { cartId } = params;
      const response = await axiosAuthClient.put<CartDto>(`/orders/place/${cartId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateCartItem = createAsyncThunk<CartDto, { params: CartItemParamsDto; body: UpdateCartItemForm }>(
  "PUT/update-cart-item",
  async ({ params, body }, { rejectWithValue }) => {
    try {
      const { cartId, itemId } = params;

      const response = await axiosAuthClient.put<CartDto>(`/orders/${cartId}/items/${itemId}`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCart = createAsyncThunk<undefined, { params: CartParamsDto }>(
  "DELETE/delete-cart",
  async ({ params }, { rejectWithValue }) => {
    try {
      const { cartId } = params;

      const response = await axiosAuthClient.delete(`/orders/${cartId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk<CartDto, { params: CartItemParamsDto }>(
  "DELETE/delete-cart-item",
  async ({ params }, { rejectWithValue }) => {
    try {
      const { cartId, itemId } = params;

      const response = await axiosAuthClient.delete<CartDto>(`/orders/${cartId}/items/${itemId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
