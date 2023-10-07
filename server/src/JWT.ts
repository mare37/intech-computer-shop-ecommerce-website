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

const createRefreshToken = (UserPayload:UserPayload) =>{
    console.log("secret length " + SECRET.length);
    if(SECRET.length !== 0){
      
        

        const token = jwt.sign(UserPayload, SECRET,{ expiresIn: '3d' } );

        return token
    }

    return false
}


const validateToken = async (req:Request,res:Response,next:NextFunction)=>{


    try{
        
    const accessToken =  req.cookies['access_token']

    
    

    if(SECRET.length !== 0){


      if(!accessToken){
        console.log("This is the access token " + accessToken);
        
           return res.send({loginStatus:false, message:"Login to continue"})
        } else{

             jwt.verify(accessToken, SECRET, async function(err:any, decoded:any) {

                if(err) {

                    return res.send({loginStatus:false, message:"Login to continue",error:err,})
                }
    
                console.log(decoded)

                const User = await userModel.findById({_id:decoded.id})

               // console.log("This object     " +    User?.email);
                req.user =  User?._id.toString() 
                
    
                next()
            });


        }

       

    }
    

    }catch(err){

       console.log(err);
       
        return res.send({loginStatus:false, error:err})



    }


   


}

export {createToken,createRefreshToken,validateToken}