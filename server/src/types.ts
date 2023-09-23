import { ObjectId } from "mongoose"


export type array ={
  cart:[]
}

interface str{
  status:string
}

export interface User {
    firstName: string
    lastName: string
    email:string
    mobile:Number
    password:string
    role:string
    status:string
    cart:array
   
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
