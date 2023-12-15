import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface blogCatState {
  productCat: string[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  gettingBlogCategories: boolean;
}

const initialState: blogCatState = {
  productCat: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  gettingBlogCategories: false,
};

export const blogCatSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGettingBlogCategories: (state) => {
      state.gettingBlogCategories = true;
    },
    resetGettingBlogCategories: (state) => {
      state.gettingBlogCategories = false;
    },

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

export const {
  isLoading,
  isSuccess,
  isError,
  reset,
  setGettingBlogCategories,
  resetGettingBlogCategories,
} = blogCatSlice.actions;

export default blogCatSlice.reducer;
