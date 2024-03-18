
import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { loading, error, success, reset } from "../redux/userSlice";










export const getAllUsers = async (dispatch: any) => {
    const setReset = () => {
      dispatch(reset());
    };
    dispatch(loading());
  
    try {
      const result = await axios.get(`${base_url}getallusers`);
  
      console.log(result.data);
      if (result.data.usersRetrieved) {
        dispatch(reset());
      } else {
        dispatch(error());
      }
  
      return result.data;
    } catch (error) {
      console.log(error);
      dispatch(reset());
      return { usersRetrieved: false };
    }
  };


  export const getAllUsersWithoutLoading = async (dispatch: any) => {
   
  
    try {
      const result = await axios.get(`${base_url}getallusers`);

      
  
    
    
  
      return result.data;
    } catch (error) {
      console.log(error);
    
      return { usersRetrieved: false };
    }
  };


  


  export const  removeUser = async (id: string, dispatch: any) => {

    const setReset = () => {
      dispatch(reset());
    };
  
  //  dispatch(isLoading());
    try {
      const result = await axios.delete(`${base_url}getoneuser/${id}`);
  
     
  
      if (result.data.userUpdated) {
        console.log(result);
      //  dispatch(isSuccess());
       // setTimeout(setReset, 2000);
      } else {
       // dispatch(isError());
      }
      return result.data
    } catch (error) {
    // dispatch(reset());
  
      console.log(error);
      return { blogDeleted: false  }
    }
  };

// Activate users account
  export const  reactivateOneuser = async (id: string, dispatch: any) => {

    const setReset = () => {
      dispatch(reset());
    };
  
 ///   dispatch(isLoading());
    try {
      const result = await axios.put(`${base_url}reactivateuser/${id}`);
  
    
  
      if (result.data.userUpdated) {
        console.log(result);
      //  dispatch(isSuccess());
       // setTimeout(setReset, 2000);
      } else {
       // dispatch(isError());
      }
      return result.data
    } catch (error) {
 //    dispatch(reset());
  
      console.log(error);
      return { userUpdated: false  }
    }
  };