import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface orderItemState {
  orderItem: boolean;
  id: string;
}

const initialState: orderItemState = {
  orderItem: false,
  id: "",
};

export const orderItemSlice = createSlice({
  name: "orderItem",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrderItem: (state) => {
      state.orderItem = !state.orderItem;
    },
    setOrderItemToFalse: (state) => {
      state.orderItem = false;
    },
    setorderItemToTrue: (state) => {
      state.orderItem = true;
    },
    setOrderId: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const {
  setOrderItem,
  setOrderItemToFalse,
  setorderItemToTrue,
  setOrderId,
} = orderItemSlice.actions;

export default orderItemSlice.reducer;
