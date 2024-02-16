import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import {
  isLoading,
  isError,
  isSuccess,
  reset,
  setGettingProductCategories
} from "../redux/productcategorySlice";

export const addProductCategory = async (title: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}product-category`, {
      title: title,
    });

    if (result.data.productCatCreated) {
      dispatch(isSuccess());

      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }

    return result.data
    
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return {productCatCreated: false   }
  }
};

export const getAllProductCategories = async (dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}product-category`);

    console.log(result);
    

    dispatch(isSuccess());

    dispatch(setGettingProductCategories())

    return result.data;
  } catch (error) {
    dispatch(isError());
    console.log(error); 
    return { productCatRetrieved: false  }
  }
};

export const deleteProductCategory = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}product-category/${id}`);

    console.log(result);

    if (result.data.productCatDeleted) {
      dispatch(isSuccess());
      
    } else {
      dispatch(isError());
    }
    return result.data
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return {productCatDeleted:false }
  }
};

export const updateProductCategory = async (
  id: string,
  title: string,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());
  try {
    const result = await axios.put(`${base_url}product-category/${id}`, {
      title: title,
    });

    console.log(result);

    if (result.data.productCatUpdated) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }
    return result.data
  } catch (error) {
    console.log(error);

    dispatch(isError());
    return {productCatUpdated: false }
  }
};

export const getOneProductCategory = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  const loading = () => {
    console.log("loading");
  };

  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}product-category/${id}`);
    //console.log(result);

    setTimeout(() => {
      loading();
    }, 10000);

    dispatch(isSuccess());
    setTimeout(setReset, 2000);
    return result.data;
  } catch (error) {
    dispatch(isError());
    return { productCatRetrieved: false }
  }
};
