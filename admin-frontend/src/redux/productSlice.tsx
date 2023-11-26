import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productState {
  productIsError: boolean;
  productIsLoading: boolean;
  productIsSuccess: boolean;
  GET: boolean;
  DELETE: boolean;
}

const initialState: productState = {
  productIsError: false,
  productIsLoading: false,
  productIsSuccess: false,
  GET: false,
  DELETE: false,
};

export const productSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isDelete: (state) => {
      state.DELETE = true;
    },
    isGet: (state) => {
      state.GET = true;
    },
    resetDelete: (state) => {
      state.DELETE = false;
    },
    resetGet: (state) => {
      state.GET = false;
    },
    isLoading: (state) => {
      state.productIsLoading = true;
    },

    isSuccess: (state) => {
      state.productIsError = false;
      state.productIsLoading = false;
      state.productIsSuccess = true;
    },
    isError: (state) => {
      state.productIsLoading = false;
      state.productIsSuccess = false;
      state.productIsError = true;
    },
    reset: (state) => {
      state.productIsLoading = false;
      state.productIsSuccess = false;
      state.productIsError = false;
    },
  },
});

export const {
  isLoading,
  isSuccess,
  isError,
  reset,
  isDelete,
  isGet,
  resetDelete,
  resetGet,
} = productSlice.actions;

export default productSlice.reducer;
