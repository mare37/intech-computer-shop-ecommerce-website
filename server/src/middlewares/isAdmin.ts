import {Request, Response, NextFunction} from "express"
import userModel from "../models/userModel";


const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{

    console.log("Now we are in admin " +  req?.user);


    try{
        const User = await userModel.find({_id:req.user})

        console.log(User);

        if(User[0].role === "Admin"){
            next()
        }else{
            return res.send("Access denied")
        }
        
    }catch(err){
        console.log(err);
        
    }



    






}

export default isAdmin