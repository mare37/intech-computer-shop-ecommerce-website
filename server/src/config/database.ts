import mongoose from "mongoose";
import 'dotenv/config'


const connectDb =  async () =>{

    mongoose

    const PASSWORD = process.env.MONGO || '';

    try{

        
        
        if(PASSWORD.length !== 0){

            await mongoose.connect(PASSWORD, )
            console.log("MONGO CONNECTED");    
        }else{
            throw new Error("Password required.Database not connected")
        }
            
       
        


       
    }catch(err){
        throw new Error("Error connecting to database")
        
    }


}

export default connectDb;