import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuthClient } from "api/axios.client";
import { AuthDto } from "../types/auth.dto";
import { SignUpForm } from "../types/signup.form";
import { SignInForm } from "../types/signin.form";
import { LocalStorageKey } from "enums/local-storage-key.enum";

export const signUp = createAsyncThunk<AuthDto, { body: SignUpForm }>("POST/signup", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.post<AuthDto>("/auth/signup", body);
    localStorage.setItem(LocalStorageKey.AccessToken, response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem(LocalStorageKey.AccessToken);
    return rejectWithValue(error);
  }
});

export const signIn = createAsyncThunk<AuthDto, { body: SignInForm }>("POST/signin", async ({ body }, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.post<AuthDto>("/auth/signin", body);
    localStorage.setItem(LocalStorageKey.AccessToken, response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem(LocalStorageKey.AccessToken);
    return rejectWithValue(error);
  }
});

export const signOut = createAsyncThunk<AuthDto>("GET/signout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.get<AuthDto>("/auth/signout");
    localStorage.removeItem(LocalStorageKey.AccessToken);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const refreshTokens = createAsyncThunk<AuthDto>("POST/refresh-tokens", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosAuthClient.post("/auth/refresh-tokens");
    localStorage.setItem(LocalStorageKey.AccessToken, response.data.accessToken);
    return response.data;
  } catch (error: any) {
    localStorage.removeItem(LocalStorageKey.AccessToken);
    return rejectWithValue(error);
  }
});
