import axios from "axios";
import { base_url } from "../utils/baseurl";
import { useAppDispatch } from "../hooks";

import { isLoading, isError, isSuccess,reset } from "../redux/colourSlice";




export const addColour = async (title: string, dispatch: any) => {
 

  const setReset = ()=>{
    dispatch(reset())

  }

  dispatch(isLoading());

  try {
    const result = await axios.post(`${base_url}colour`, {
      title: title,
    });

    if (result.data.colourCreated) {
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

export const getAllColours = async (dispatch: any) => {

  const setReset = ()=>{
    dispatch(reset())

  }

  dispatch(isLoading());

  try {
    const result = await axios.get(`${base_url}colour`);

       console.log(result);
       if(result.data.coloursRetrieved  ){
       // dispatch(isSuccess());
       setTimeout(setReset, 2000);
        return result.data
       }else{
        dispatch(isError());
       }

    return result.data.result
  } catch (error) {
    console.log(error);
  }
};

export const deleteColour = async (id: string, dispatch: any) => {
  dispatch(isLoading());
  try {
    const result = await axios.delete(`${base_url}colour/${id}`);

    console.log(result);

    if (result.data.colourDeleted) {
      dispatch(isSuccess());
    } else {
      dispatch(isError());
    }
  } catch (error) {
    dispatch(isError());

    console.log(error);
  }
};


export const updateColour = async(id:string,title:string,dispatch:any) =>{
  
  const setReset = ()=>{
    dispatch(reset())

  }
  
           dispatch(isLoading());
  try{

    const result = await  axios.put(`${base_url}colour/${id}`,{
      title:title
    })

    console.log(result);
    

    if (result.data.colourUpdated) {
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


export const  getOneColour = async (id:string,dispatch:any)=>{
  const setReset = ()=>{
    dispatch(reset())

  }

  const loading = ()=>{
    console.log("loading");
    

  }
 
 


  dispatch(isLoading());

  try {

    

    const result = await axios.get(`${base_url}colour/${id}`)
    //console.log(result);

    setTimeout(()=>{loading()}, 10000);
    


    dispatch(isSuccess());
    setTimeout(setReset, 2000);
    return result.data
    
  } catch (error) {
    dispatch(isError());

  }




}
