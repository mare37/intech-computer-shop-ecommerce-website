import mongoose from "mongoose";
import { ObjectId } from "mongoose";

import { Schema } from "mongoose";
import { ProductCategory } from "../types";



const productCatSchema = new Schema<ProductCategory >({

    title:{
        type:String,
        unique:true
        
    },
    status:{
        type:String,
        default:"Active",
    }
    

      

},{timestamps:true})


export default  mongoose.models.ProductCategory || mongoose.model("ProductCategory",productCatSchema);