import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { isLoading, isError, isSuccess, reset } from "../redux/enquirySlice";
import {
  isLoadingOneMessage,
  isSuccessOneMessage,
  isErrorOneMessage,
  resetOneMessage,
} from "../redux/oneMessageSlice";

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
    return { brandCreated: false };
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

export const getAllEnquiriesWithoutLoading = async (dispatch: any) => {
  try {
    const result = await axios.get(`${base_url}enquiry`);

    console.log(result.data);
    if (result.data.enquiriesRetrieved) {
      //dispatch(isSuccess());
    } else {
      //dispatch(isError());
    }


    /*if (result.data.enquiryDeleted) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }*/

    return result.data;
  } catch (error) {
    console.log(error);

    return { enquiriesRetrieved: false };
  }
};

export const getOneEnquiry = async (id: string, dispatch: any) => {
  try {
    dispatch(isLoadingOneMessage());

    const result = await axios.get(`${base_url}enquiry/${id}`);
    console.log(result);
    if (result.data.enquiryRetrieved) {
      console.log(result);
      dispatch(isSuccessOneMessage());
    } else {
      console.log(result);
      dispatch(isErrorOneMessage());
    }

    //dispatch(resetOneMessage());

    return result.data;
  } catch (error) {
    console.log(error);

    dispatch(isErrorOneMessage());
    return { enquiryRetrieved: false };
  }
};

export const deleteEnquiry = async (id: string, dispatch: any) => {
  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}enquiry/${id}`);

    console.log(result);

    if (result.data.enquiryDeleted) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
    return result.data;
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return { enquiryDeleted: false };
  }
};

export const updateEnquiry = async (id: string, dispatch: any) => {
  try {
    const result = await axios.put(`${base_url}enquiry/${id}`, {
      enquiryStatus: "Read",
    });

    if (result.data.enquiryUpdated) {
      dispatch(isSuccess());
      //dispatch(reset());
    } else {
      dispatch(isError());
    }

    return result.data;
  } catch (error) {
    console.log(error);

    return { brandUpdated: false };
  }
};
