import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface popUpState {
  popup: boolean;
  id:string
}

const initialState: popUpState = {
  popup: false,
  id:""
};

export const popUpSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPopUp: (state) => {
      state.popup = !state.popup 
    },
    setPopUpToFalse: (state) => {
      state.popup = false 
    },
    setPopUpToTrue: (state) => {
      state.popup = true 
      },
    setId: (state, action) =>{
      state.id = action.payload.id
    }  
  },
});

export const { setPopUp, setPopUpToFalse, setPopUpToTrue,   setId } = popUpSlice.actions;

export default popUpSlice.reducer;
