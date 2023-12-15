import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface blogState {
  blog: string[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  gettingBlogs: boolean;
}

const initialState: blogState = {
  blog: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  gettingBlogs: false,
};

export const blogSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGettingBlogs: (state) => {
      state.gettingBlogs = true;
    },
    resetGettingBlogs: (state) => {
      state.gettingBlogs= false;
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
  setGettingBlogs,
  resetGettingBlogs
} = blogSlice.actions;

export default blogSlice.reducer;
