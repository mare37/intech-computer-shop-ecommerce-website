import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface spinnerState {
  spinner: boolean;
  id: string
  
}

const initialState: spinnerState = {
    spinner: false,
    id:""
 
};

export const spinnerSlice = createSlice({
  name: "spinner",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSpinner: (state) => {
      state.spinner = !state.spinner
    },
    setSpinnerToFalse: (state) => {
      state.spinner = false 
    },
    setSpinnerToTrue: (state) => {
      state.spinner = true 
      },
    setId: (state, action) =>{
      state.id = action.payload.id
    }  
  },
});

export const { setSpinner,  setSpinnerToFalse, setSpinnerToTrue,   setId } = spinnerSlice.actions;

export default spinnerSlice.reducer;
