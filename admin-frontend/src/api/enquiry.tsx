import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { isLoading, isError, isSuccess, reset } from "../redux/enquirySlice";

export const createEquiry = async (title: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}brand`, {
      title: title,
    });

    if (result.data.brandCreated) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
    setTimeout(setReset, 2000);
    console.log(result.data);
    return result.data;
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return { brandCreated:false   }
  }
};

export const getAllEnquiries = async (dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}enquiry`);

    console.log(result.data);
    if (result.data.enquiriesRetrieved) {
      dispatch(reset());
    } else {
      dispatch(isError());
    }

    return result.data;
  } catch (error) {
    console.log(error);
    dispatch(reset());
    return { enquiriesRetrieved: false };
  }
};



export const getOneEnquiry = async (id: string, dispatch: any) => {
  try {
    dispatch(isLoading());

    const result = await axios.get(`${base_url}enquiry/${id}`);

    if (result.data.brandRetrieved) {
      console.log(result);
      dispatch(isSuccess());
    } else {
      console.log(result);
      dispatch(isError());
    }

    dispatch(reset());

    return result.data;
  } catch (error) {
    console.log(error);

    dispatch(isError());
    return { brandRetrieved: false  }
  }
};
