import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface displayEnquiryState {
    displayEquiry: boolean;
  id: string;
}

const initialState:  displayEnquiryState  = {
  displayEquiry: false,
  id: "",
};

export const displayEnquirySlice = createSlice({
  name: "Display Message",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDisplayEnquiry: (state) => {
      state.displayEquiry = !state.displayEquiry;
    },
    setDisplayEnquiryToFalse: (state) => {
      state.displayEquiry= false;
    },
    setDisplayEnquiryToTrue: (state) => {
      state.displayEquiry = true;
    },
    setEquiryId: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const {
    setDisplayEnquiry,
    setDisplayEnquiryToFalse,
    setDisplayEnquiryToTrue,
    setEquiryId,
} = displayEnquirySlice.actions;

export default displayEnquirySlice.reducer;
