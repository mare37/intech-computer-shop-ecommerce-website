import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface oneMessageState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: oneMessageState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const oneMesssageSlice = createSlice({
  name: "loading one message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isLoadingOneMessage: (state) => {
      state.isLoading = true;
    },

    isSuccessOneMessage: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    },
    isErrorOneMessage: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    },
    resetOneMessage: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export const {   isLoadingOneMessage,   isSuccessOneMessage,  isErrorOneMessage, resetOneMessage } = oneMesssageSlice .actions;

export default oneMesssageSlice.reducer;
