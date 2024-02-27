import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface orderState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isLoadingSingleOrder: boolean;
  singleOrderSuccess: boolean;
  singleOrderError: boolean;
}

const initialState: orderState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  isLoadingSingleOrder: false,
  singleOrderSuccess: false,
  singleOrderError: false,
};

export const orderSlice = createSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadingSingleOrder: (state) => {
      state.isLoadingSingleOrder = true;
    },

    singleOrderSuccess: (state) => {
      state.singleOrderSuccess = true;
      state.isLoadingSingleOrder = false;
      state.singleOrderError = false;
    },

    singleOrderError: (state) => {
      state.singleOrderSuccess  = false;
      state.isLoadingSingleOrder = false;
      state.singleOrderError = true;
    },

    resetSingleOrder: (state) => {
      state.isLoadingSingleOrder = false;
      state.singleOrderSuccess  = false;
      state.singleOrderError = false;
    },

    loading: (state) => {
      state.isLoading = true;
    },

    success: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    },
    error: (state) => {
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

export const {
  loading,
  success,
  error,
  reset,
  loadingSingleOrder,
  singleOrderSuccess,
  singleOrderError,
  resetSingleOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
