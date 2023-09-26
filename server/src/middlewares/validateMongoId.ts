import mongoose from "mongoose"
import { isValidObjectId } from "mongoose"
import { ObjectId } from "mongoose"


const validateMongoID = (id:string)=>{

    const isValid = mongoose.isValidObjectId(id)

    if(!isValid)  throw new Error("Invalid mongo Id");


}

export default validateMongoID