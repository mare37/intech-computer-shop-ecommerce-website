import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { isLoading, isError, isSuccess, reset } from "../redux/couponSlice";

export const addCoupon = async (
  name: string,
  expiry: Date,
  discount: number,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}coupon`, {
      name: name,
      expiry: expiry,
      discount: discount,
    });

    if (result.data.couponCreated) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
    setTimeout(setReset, 2000);
 return result.data
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const getAllCoupons = async (dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}coupon`);

    console.log(result.data);
    if (result.data.couponsRetrieved) {
      dispatch(reset());
      return result.data;
    } else {
      dispatch(isError());
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeCoupon = async (id: string, dispatch: any) => {
  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}coupon/${id}`);

    console.log(result);

    if (result.data.couponRemoved) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const updateCoupon = async (
  id: string,
  name: string,
  expiry: Date,
  discount: number,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());
  try {
    const result = await axios.put(`${base_url}coupon/${id}`, {
      name: name,
      expiry: expiry,
      discount: discount,
    });

   
       
        
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
      console.log(result);
      return result.data
  
    
  } catch (error) {
    console.log(error);

    dispatch(isError());
  }
};

export const getOneCoupon = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };



  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}coupon/${id}`);
    console.log(result);

    dispatch(isSuccess());
    setTimeout(setReset, 2000);
    return result.data;
  } catch (error) {
    console.log(error);
    
    dispatch(isError());
  }
};
