import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { isLoading, isError, isSuccess, reset } from "../redux/brandSlice";

export const addBrand = async (title: string, dispatch: any) => {
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

export const getAllBrands = async (dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}brand`);

    console.log(result.data);
    if (result.data.brandsRetrieved) {
      dispatch(reset());
    } else {
      dispatch(isError());
    }

    return result.data;
  } catch (error) {
    console.log(error);
    dispatch(reset());
    return { brandsRetrieved: false };
  }
};

export const deleteBrand = async (id: string, dispatch: any) => {
  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}brand/${id}`);

    console.log(result);

    if (result.data.brandDeleted) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
    return result.data;
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return { brandDeleted: false };
  }
};

export const updateBrand = async (id: string, title: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());
  try {
    const result = await axios.put(`${base_url}brand/${id}`, {
      title: title,
    });

    if (result.data.brandUpdated) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }

    return result.data;
  } catch (error) {
    console.log(error);

    dispatch(isError());
    return { brandUpdated: false };
  }
};

export const getOneBrand = async (id: string, dispatch: any) => {
  try {
    dispatch(isLoading());

    const result = await axios.get(`${base_url}brand/${id}`);

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
