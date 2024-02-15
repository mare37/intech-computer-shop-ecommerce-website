import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface popUpState {
  deleteAction: boolean | null;
  id: string;
}

const initialState: popUpState = {
  deleteAction: null,
  id: "",
};

export const deleteActionSlice = createSlice({
  name: "deleteAction",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDeleteActionToFalse: (state) => {
      state.deleteAction = false;
    },
    setDeleteActionToTrue: (state) => {
      state.deleteAction = true;
    },

    resetSetDeleteAction: (state) => {
      state.deleteAction = null;
    },

    setId: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const { setDeleteActionToFalse, setDeleteActionToTrue, setId, resetSetDeleteAction } =
  deleteActionSlice.actions;

export default deleteActionSlice.reducer;
