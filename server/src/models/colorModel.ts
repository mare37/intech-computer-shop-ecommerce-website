import mongoose from "mongoose";
import { ObjectId } from "mongoose";

import { Schema } from "mongoose";
import { Colour } from "../types";



const colourSchema = new Schema<Colour>({

    title:{
        type:String,
        unique:true
        
    },
    status:{
        type:String,
        default:"Active",
    }
    

      

},{timestamps:true})


export default  mongoose.models.Colour || mongoose.model("Colour", colourSchema);