import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import {
  loading,
  error,
  success,
  reset,
  loadingSingleOrder,
  singleOrderSuccess,
  singleOrderError,
  resetSingleOrder,
} from "../redux/ordersSlice";
import { setSpinnerToTrue, setSpinnerToFalse } from "../redux/spinnerSlice";

interface orderStatus {
  status: string;
  colour: string;
}



export const getAllOrders = async (dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(loading());

  try {
    const result = await axios.get(`${base_url}orders`);

    console.log(result.data);
    if (result.data.ordersRetrieved) {
      dispatch(success());
      dispatch(reset());
    } else {
      dispatch(error());
    }
    return result.data;
  } catch (err) {
    console.log(err);
    dispatch(error());
   dispatch(reset());
    return { ordersRetrieved: false };
  }
};




export const getOrdersWithoutLoading = async (dispatch: any) => {
  
  

  try {
    const result = await axios.get(`${base_url}orders`);

    console.log(result.data);
    if (result.data.ordersRetrieved) {
      
    } else {
      dispatch(error());
    }
    return result.data;
  } catch (err) {
    console.log(err);

    dispatch(error());
    return { ordersRetrieved: false };
  }
};



export const updateOrderStatus = async (
  id: string,
  orderStatus:orderStatus,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  // dispatch(loading());
  dispatch(setSpinnerToTrue());
  try {
    const result = await axios.put(`${base_url}orders/${id}`, {
      orderStatus: orderStatus,
    });

   
    if (result.data.orderStatusUpdated) {
      console.log(result.data);

      // dispatch(success());
      // dispatch(reset());
    } else {
      //dispatch(error());
    }
    return result.data;
  } catch (err) {
    console.log(err);

    dispatch(error());
    return { orderStatusUpdated: false };
  }
};



export const removeOrder = async (id: string, dispatch: any) => {
  dispatch(loading());
  try {
    const result = await axios.put(`${base_url}orders/remove/${id}`);

    console.log(result);

    if (result.data.orderRemoved) {
      dispatch(success());
    } else {
      dispatch(error());
    }
    return result.data;
  } catch (err) {
    dispatch(error());

    console.log(error);
    return { orderRemoved: false };
  }
};

export const getOneOrder = async (id: string, dispatch: any) => {
  dispatch(loadingSingleOrder());
  try {
    const result = await axios.get(`${base_url}orders/one-order/${id}`);

    console.log(result);

    if (result.data.orderRetreived) {
      console.log("Its successfull");
      
      dispatch(singleOrderSuccess());
    } else {
      console.log("It has failed");
      dispatch(singleOrderError());
    }
    return result.data
  } catch (err) {
    dispatch(singleOrderError());

    console.log(error);
    return {orderRetreived: false}
  }
};



