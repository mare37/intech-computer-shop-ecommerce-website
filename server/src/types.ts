import { ObjectId } from "mongoose"


export type array ={
  cart:[]
}



export interface User {
    firstName: string
    lastName: string
    email:string
    mobile:Number
    password:string
    role:string
    refreshToken:string
    status:string
    cart:array
   
  }

  export interface Product {
    title:string
    slug:string
    description:string
    price:number
    sold:number
    brand:number
    status:string
    category:ObjectId
    quantity:number
    images?: Array<string>
    color:string
    ratings:[]



   
   
  }




export interface UserPayload{
  email:string
  id:string

}


export interface UserRequest{

  _id: ObjectId
  firstName:string
  lastName : string
 email: string
   mobile: Number
 role: string
 status: string

}
