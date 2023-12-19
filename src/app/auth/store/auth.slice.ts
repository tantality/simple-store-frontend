import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.state";
import { refreshTokens, signIn, signUp } from "./auth.actions";

const initialState: AuthState = {
  isAuth: false,
  isPending: {
    isAuth: false,
  },
  errors: {
    isAuth: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isPending.isAuth = false;
        state.isAuth = true;
      })
      .addCase(signUp.rejected, (state, action: any & { payload: any }) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.payload.message;
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isPending.isAuth = false;
        state.isAuth = true;
      })
      .addCase(signIn.rejected, (state, action: any & { payload: any }) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.payload.message;
      })
      // Refresh Tokens
      .addCase(refreshTokens.pending, (state) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(refreshTokens.fulfilled, (state) => {
        state.isPending.isAuth = false;
        state.isAuth = true;
      })
      .addCase(refreshTokens.rejected, (state, action: any & { payload: any }) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.payload.message;
      });
  },
});
