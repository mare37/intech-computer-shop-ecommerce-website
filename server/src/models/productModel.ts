import mongoose from "mongoose";
import { ObjectId } from "mongoose";

import { Schema } from "mongoose";
import { Product } from "../types";



const productSchema = new Schema<Product>({

    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

    sold:{
        type:Number,
        default:0,
        select:false
    },

    brand:{
        type:Number,
        enum: ["Lenovo", "Samsung"]
    },
    status:{
        default: 'Active',
        type:String, 
        required:true,
        select:false
      },


    category:{
        type:mongoose.Schema.ObjectId,
        ref: "Category"
        
    },
    quantity: Number,
    images:{
        type:Array,
    },
  

    color:{
        type:String,
        enum: ["black","white","red"]
    },

    ratings:[
        {
            star:Number,
            postedBy: {type: mongoose.Schema.ObjectId,ref: "User" }
        }
    ]

      

},{timestamps:true})


export default  mongoose.models.Product || mongoose.model("Product", productSchema );