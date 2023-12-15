import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import {
   setGettingBlogs,
  isLoading,
  isError,
  isSuccess,
  reset,
} from "../redux/blogSlice";

interface Blog {
  title: string;
  description: string;
  category: string;
  
}

export const createBlog = async (blogObject: Blog, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}blog`, {
      blogObject,
    });
    console.log(result.data);
    if (result.data.blogPosted) {
      dispatch(isSuccess());
      console.log(result.data);
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }

    return result.data

  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const getAllBlogs = async (dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };
  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}blog`);

    console.log(result);
    

    if (result.data.blogRetrieved) {
      dispatch(isSuccess());
      dispatch(setGettingBlogs())
     
      console.log(result.data);
      return result.data;
    } else {
      dispatch(isError());
    }
  } catch (error) {
    console.log(error);
    //  dispatch(isError());
  }
};

export const deleteBlog = async (id: string, dispatch: any) => {

  const setReset = () => {
    dispatch(reset());
  };

  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}blog/${id}`);

    console.log(result);

    if (result.data.blogDeleted) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const updateBlog = async (
  id: string,
  blogObject: Blog,
  dispatch: any
) => {
  const setReset = () => {
    dispatch(reset());
  };

  console.log( blogObject);

  dispatch(isLoading());
  try {
    const result = await axios.put(`${base_url}blog/${id}`, {
      blogObject,
    });

    console.log(result);

    if (result.data.blogUpdated) {
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

export const getOneBlog = async (id: string, dispatch: any) => {
  const setReset = () => {
    dispatch(reset());
  };

  const loading = () => {
    console.log("loading");
  };

  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}blog/${id}`);

    if (result.data.blogRetrieved) { 
      dispatch(isSuccess());
     // dispatch(isGet());
      setTimeout(setReset, 2000);
      return result.data.blog;
    } else {
      dispatch(isError());
    }

    dispatch(isSuccess());
    setTimeout(setReset, 2000);
  } catch (error) {
    dispatch(isError());
  }
};
