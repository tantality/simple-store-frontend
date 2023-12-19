import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuthClient, axiosClient } from "api/axios.client";
import { AuthDto } from "../types/auth.dto";
import { SignUpForm } from "../types/signup.form";
import { SignInForm } from "../types/signin.form";

export const SignUp = createAsyncThunk<AuthDto, { body: SignUpForm }>("POST/signup", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<AuthDto>("/auth/signup", body);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const SignIn = createAsyncThunk<AuthDto, { body: SignInForm }>("POST/signin", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<AuthDto>("/auth/signin", body);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const SignOut = createAsyncThunk<AuthDto>("GET/signout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.get<AuthDto>("/auth/signout");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const RefreshTokens = createAsyncThunk<AuthDto>("POST/refresh-tokens", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/auth/signout", _, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
