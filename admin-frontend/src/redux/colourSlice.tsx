import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface brandState {
  colour: string[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: brandState = {
  colour: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const colourSlice = createSlice({
  name: "colour",
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

export const { isLoading, isSuccess, isError, reset } = colourSlice.actions;

export default colourSlice.reducer;
