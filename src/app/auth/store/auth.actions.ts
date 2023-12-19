import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuthClient, axiosClient } from "api/axios.client";
import { AuthDto } from "../types/auth.dto";
import { SignUpForm } from "../types/signup.form";
import { SignInForm } from "../types/signin.form";

export const signUp = createAsyncThunk<AuthDto, { body: SignUpForm }>("POST/signup", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<AuthDto>("/auth/signup", body);
    localStorage.setItem("access-token", response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("access-token");
    return rejectWithValue(error);
  }
});

export const signIn = createAsyncThunk<AuthDto, { body: SignInForm }>("POST/signin", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post<AuthDto>("/auth/signin", body);
    localStorage.setItem("access-token", response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("access-token");
    return rejectWithValue(error);
  }
});

export const signOut = createAsyncThunk<AuthDto>("GET/signout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.get<AuthDto>("/auth/signout");
    localStorage.setItem("access-token", response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("access-token");
    return rejectWithValue(error);
  }
});

export const refreshTokens = createAsyncThunk<AuthDto>("POST/refresh-tokens", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/auth/signout", _, { withCredentials: true });
    localStorage.setItem("access-token", response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("access-token");
    return rejectWithValue(error);
  }
});
