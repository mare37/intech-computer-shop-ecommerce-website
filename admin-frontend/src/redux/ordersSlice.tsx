import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface orderState {
  
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: orderState = {

  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const orderSlice = createSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
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

export const { loading, success, error, reset } =  orderSlice.actions;

export default  orderSlice.reducer;
