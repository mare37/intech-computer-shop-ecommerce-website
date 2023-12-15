import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import {
  isLoading,
  isError,
  isSuccess,
  reset,
  setGettingBlogCategories,
  resetGettingBlogCategories
} from "../redux/blogcategorySlice"; 

export const addBlogCategory = async (title: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}blog-category`, {
      title: title,
    });

    if (result.data.blogCatCreated) {
      dispatch(isSuccess());

      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }

    console.log(result.data);
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const getAllBlogCategories = async (dispatch: any) => { 

    const setReset = () => {
        dispatch(reset());
      };


  dispatch(isLoading());


  try {
    const result = await axios.get(`${base_url}blog-category`);

    if (result.data.blogCatRetrieved) {
    
      dispatch(isSuccess());
      dispatch(setGettingBlogCategories())
     
    
     
       
        
       return result.data.result;
      } else {
        dispatch(isError());
      }
    return result.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogCategory = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  
  dispatch(isLoading());

  try {
    const result = await axios.delete(`${base_url}blog-category/${id}`);

    console.log(result);

    if (result.data.blogCatDeleted) {
      dispatch(isSuccess());
      
    } else {
      dispatch(isError());
    }
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const updateBlogCategory = async (
  id: string,
  title: string,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading()); 
  try {
    const result = await axios.put(`${base_url}blog-category/${id}`, {
      title: title,
    });

    console.log(result);

    if (result.data.blogCatUpdated) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }
  } catch (error) {
    console.log(error);

    dispatch(isError());
  }
};

export const getOneBlogCategory = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  const loading = () => {
    console.log("loading");
  };

  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}blog-category/${id}`);
    //console.log(result);

    setTimeout(() => {
      loading();
    }, 10000);

    dispatch(isSuccess());
    setTimeout(setReset, 2000);
    return result.data;
  } catch (error) {
    dispatch(isError());
  }
};
