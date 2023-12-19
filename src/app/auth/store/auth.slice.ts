import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.state";
import { RefreshTokens, SignIn, SignUp } from "./auth.actions";

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
      .addCase(SignUp.pending, (state) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(SignUp.fulfilled, (state) => {
        state.isPending.isAuth = false;
        state.isAuth = true;
      })
      .addCase(SignUp.rejected, (state, action: any & { payload: any }) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.payload.message;
      })
      // Sign In
      .addCase(SignIn.pending, (state) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(SignIn.fulfilled, (state) => {
        state.isPending.isAuth = false;
        state.isAuth = true;
      })
      .addCase(SignIn.rejected, (state, action: any & { payload: any }) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.payload.message;
      })
      // Sign In
      .addCase(RefreshTokens.pending, (state) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(RefreshTokens.fulfilled, (state) => {
        state.isPending.isAuth = false;
        state.isAuth = true;
      })
      .addCase(RefreshTokens.rejected, (state, action: any & { payload: any }) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.payload.message;
      });
  },
});
