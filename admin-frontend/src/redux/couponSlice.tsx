import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface couponState {
  colour: string[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: couponState = {
  colour: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const couponSlice = createSlice({
  name: "coupon",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isLoading: (state) => {
      state.isLoading = true;
    },

    isSuccess: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    },
    isError: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export const { isLoading, isSuccess, isError, reset } = couponSlice.actions;

export default couponSlice.reducer;
