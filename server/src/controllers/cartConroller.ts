import { Request, Response } from "express";
import cartModel from "../models/cartModel";
import userModel from "../models/userModel";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

export const createCart = async (req: Request, res: Response) => { 
    const { orderby } = req.body;


    const User = await cartModel.find({orderby: orderby})

    if(User.length === 1  ){
        return res.send("There is a pending cart.Clear cart")
    }
  

    try {
      const result = await cartModel.create( 
        { productId:"", count:0,colour:"", price:0, cartTotal:0,totalAfterDiscount:0,orderby:orderby },
      );
    return  res.send({ cartCreated: true, result: result });
    } catch (error) {
      res.send({ cartCreated: false, error: error });
    }
  
};

export const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await cartModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({cartnDeleted: true, result: result }); 
  } catch (error) {
    res.send({cartDeleted: false, error: error });
  }
};

export const getOneCart = async (req: Request, res: Response) => {
  const { orderby } = req.params;

  try {
    const result = await cartModel.findOne({ orderby: orderby }).populate("products.product")
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error });
  }
};

export const getAllCart = async (req: Request, res: Response) => {
  

  try {
    const result = await cartModel.find({status:"Active"});
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error }); 
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const { productId, count ,colour ,price,cartTotal, totalAfterDiscount,orderby } = req.body;

  const { name, expiry, discount } = req.body;

  try {

    const User = await cartModel.find({orderby: orderby})

    if(User.length === 0 ){
        return res.send("No cart, create cart first")
    }

    const product ={
        product:productId,
        count:count+1,
        colour:colour,
        price:price
    }

    
    

  


    const result = await userModel.findOneAndUpdate(
      { _id: orderby },
      { 
        $push: { products: product},
        $inc: { cartTotal: price,totalAfterDiscount:totalAfterDiscount},
       
        orderby:orderby


       
    },
      { new: true }
    );
    res.send({cartUpdated: true, result: result });
  } catch (error) {
    console.log(error);
    
    res.send({cartUpdated: false, error: error });
  }
};




export const removeFromCart = async (req: Request, res: Response) => {

    const {cartProductId} = req.params
    const { price,cartTotal, totalAfterDiscount,orderby } = req.body;
  
    const { name, expiry, discount } = req.body;
  
    try {
  
      const User = await cartModel.find({orderby: orderby})
  
      if(User.length === 0 ){
          return res.send("No cart, create cart first")
      }

  
  
      const result = await cartModel.findOneAndUpdate(
        { orderby: orderby },
        { 
          $pull: { products: {_id:cartProductId}},
          $inc: { cartTotal: -price,totalAfterDiscount:-totalAfterDiscount},
         
          orderby:orderby        
      },
        { new: true }
      );
      res.send({cartUpdated: true, result: result });
    } catch (error) {
      console.log(error);
      
      res.send({cartUpdated: false, error: error });
    }
  };
  
