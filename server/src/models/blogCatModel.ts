import mongoose from "mongoose";
import { ObjectId } from "mongoose";

import { Schema } from "mongoose";
import { BlogCategory } from "../types";



const blogCatSchema = new Schema<BlogCategory>({

    title:{
        type:String,
        unique:true
        
    },
    status:{
        type:String,
        default:"Active",
    }
    

      

},{timestamps:true})


export default  mongoose.models.BlogCategory || mongoose.model("BlogCategory",blogCatSchema);