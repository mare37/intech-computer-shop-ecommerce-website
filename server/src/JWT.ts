import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
import { UserPayload } from "./types"

import userModel from "./models/userModel";



  
const SECRET = process.env.SECRET || ''; 

const createToken = (UserPayload:UserPayload) =>{
    console.log("secret length " + SECRET.length);
    if(SECRET.length !== 0){
      
        

        const token = jwt.sign(UserPayload, SECRET,{ expiresIn: '1h' } );

        return token
    }

    return false
}


const validateToken = async (req:Request,res:Response,next:NextFunction)=>{


    const accessToken =  req.cookies['access_token']

    console.log(accessToken);
    

    if(SECRET.length !== 0){


      if(!accessToken){
           return res.send({loginStatus:false, message:"Login to continue"})
        } else{

             jwt.verify(accessToken, SECRET, async function(err:any, decoded:any) {

                if(err) throw new Error(err);
    
                console.log(decoded)

                const User = await userModel.findById({_id:decoded.id})

                console.log("This object     " +    User?.email);
                req.user =  User?.email
                
    
                next()
            });


        }

       

    }
    
   


}

export {createToken,validateToken}