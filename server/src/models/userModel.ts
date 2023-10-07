import mongoose from "mongoose";
import { User,array } from "../types";


const {Schema} = mongoose;





/*export interface DummyDocument extends  Journal, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    _doc?: any
  }*/

const userSchema = new Schema<User>({
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },
    email:{
      type:String,  
      required:true,
      unique:true
    },
    mobile:{
      type:Number,  
      required:true,
      unique:true
    },
    password:{
        type:String, 
        required:true
      },

    role:{
      default: 'User',
      type:String, 
      required:true
    },
    refreshToken:{
      type:String
    },

    status:{
      default: 'Active',
      type:String, 
      required:true
    },
    cart:{
      //default:[],
      type:Array
    },
    passwordChangedAt:Date,
    passwordResetExpires: Date,
    passwordResetToken:{
      default:'',
      type:String
    }
    



}, {timestamps:true}
)


export default  mongoose.models.User || mongoose.model<User>("User", userSchema );