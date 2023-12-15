import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { isLoading, isError, isSuccess,reset } from "../redux/brandSlice";




export const addBrand = async (title: string, dispatch: any) => {
 

  const setReset = ()=>{
    dispatch(reset())

  }

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
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};

export const getAllBrands = async (dispatch: any) => {
  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}brand`);

    //   console.log(result.data.result);

    return result.data;
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};


export const updateBrand = async(id:string,title:string,dispatch:any) =>{
  
  const setReset = ()=>{
    dispatch(reset())

  }
  
           dispatch(isLoading());
  try{

    const result = await  axios.put(`${base_url}brand/${id}`,{
      title:title
    })

    if (result.data.brandUpdated) {
      dispatch(isSuccess());
      setTimeout(setReset, 2000);
    } else {
      dispatch(isError());
    }

   
    

  }catch(error){
    console.log(error);
    

    dispatch(isError());

  }


}


export const  getOneBrand = async (id:string,dispatch:any)=>{
  const setReset = ()=>{
    dispatch(reset())

  }

  const loading = ()=>{
    console.log("loading");
    

  }
 
 


  dispatch(isLoading());

  try {

    

    const result = await axios.get(`${base_url}brand/${id}`)
    //console.log(result);

    setTimeout(()=>{loading()}, 10000);
    


    dispatch(isSuccess());
    setTimeout(setReset, 2000);
    return result.data
    
  } catch (error) {
    dispatch(isError());

  }




}
