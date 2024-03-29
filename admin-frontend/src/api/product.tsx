import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import {
  isDelete,
  setGettingProducts,
  isLoading,
  isError,
  isSuccess,
  reset,
} from "../redux/productSlice";

interface Product {
  title: string;
  description: string;
  price: number;
  brand: string;
  status: string;
  category: string;
  color: string;
}

export const addProduct = async (productObject: Product, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}product`, {
      productObject
    });

    console.log(result);
    
   
    if (result.data.productCreated) { 
      dispatch(isSuccess());
    
   //  setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }

    return result.data 
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return {  productCreated:false }
  }
};

export const getAllProducts = async (dispatch: any) => {

  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());
  

  try {
    const result = await axios.get(`${base_url}product?status=Active`);

    if (result.data.productRetrieved) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
      dispatch( setGettingProducts())
      console.log(result.data);
      return result.data
    } else {
      dispatch(isError());
    
    }




 
   
  } catch (error) {
    console.log(error);
   dispatch(isError());
  return {productRetrieved: false    }
  }
};

export const deleteProduct = async (id: string, dispatch: any) => {
  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}product/${id}`);

    console.log(result);

    if (result.data.productDeleted) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
    return result.data
  } catch (error) {
    dispatch(isError());

    console.log(error);
    return {productDeleted: false}
  }
  
};

export const updateProduct = async (
  id: string,
  productObject: Product,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  console.log(productObject);
  



  dispatch(isLoading());
  try {
    const result = await axios.put(`${base_url}product/${id}`, {
      productObject
    });

    console.log(result);

    if (result.data.productUpdated) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }
    return result.data
  } catch (error) {
    console.log(error);

    dispatch(isError());
    return {productUpdated: false }
  }
};

export const getOneProduct = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

 

  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}product/${id}`);
  

    if(result.data.productRetrieved){
      dispatch(isSuccess());
     
      setTimeout(setReset, 2000);
     

    }else{
      dispatch(isError());

    }

    return result.data;
    
  
  } catch (error) {
    dispatch(isError());
    setTimeout(setReset, 2000);
  }
};
