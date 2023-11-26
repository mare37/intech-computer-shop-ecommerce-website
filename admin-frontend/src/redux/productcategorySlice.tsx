import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface productCatState {
    productCat: string[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: productCatState = {
    productCat: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const  productCatSlice = createSlice({
  name: "sidebar",
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

export const { isLoading, isSuccess, isError, reset } =productCatSlice.actions;

export default productCatSlice.reducer;
