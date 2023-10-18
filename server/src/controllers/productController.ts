import { Request, Response } from "express";
import slugify from "slugify";
import productModel from "../models/productModel";
import _ from "lodash";
import mongoose from "mongoose";

import { Product } from "../types";

import splitString from "../utils/splitstring";
import limitFields from "../utils/limitfields";

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body);

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  try {
    const result = await productModel.create(req.body);

    console.log(result);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const product = await productModel.findById({ _id: id });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const deleteOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const product = await productModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" }
    );
    res.send("Successfully deleted");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

/*
export const getAllAciveProducts = async (req: Request, res: Response) => {
  console.log("products route");

  res.send("products route")


}*/

export const getAllAciveProducts = async (req: Request, res: Response) => {
  console.log("products route");

  try {
    const queryObject = { ...req.query };
    let finalSortedArray: any;
    //console.log(sort);

    console.log(queryObject);

    const excluded = ["limit", "sort", "page", "fields"];

    excluded.forEach((query) => {
      delete queryObject[query];
    });

    console.log(queryObject);

    const query = await productModel.find();

    if (req.query.sort) {
      const sort = { ...req.query };

      console.log("we are sorting now");
      console.log(sort.sort);

      //Extracting sort options from query
      let sortstring = sort.sort;

      console.log(sortstring);

      //covert sort options from query into array of strings
      const arrayOfSortOptions = splitString(sortstring);

      // console.log(finalSortedArray);

      //Sort by properties found
      arrayOfSortOptions.forEach((item: any) => {
        console.log(item[0]);

        const ascOrDesc = item[0] === "-" ? "desc" : "asc";

        const orderBy = item[0] === "-" ? item.substr(1) : item;

        finalSortedArray = _.orderBy(query, orderBy, ascOrDesc);
      });
    } else {
      finalSortedArray = _.orderBy(query, "createdAt", "asc");
    }

    if (req.query.fields) {
      const fields = req.query.fields;

      if (typeof fields === "string") {
        let fieldsString = fields.split(",").join(" ");

        console.log(fieldsString);

        const query1 = productModel.find(queryObject);

        query1.select(fieldsString.toString());

        const query = await query1.exec();

        finalSortedArray = query;
      }
    }

    //Pagination

    const { page, limit } = req.query;

    if (typeof page === "string" && typeof limit === "string") {
      console.log("WE HERE");

      const startIndex = (parseInt(page) - 1) * parseInt(limit);

      const endIndex = startIndex + parseInt(limit);

      console.log("Start  " + startIndex + "     End  " + endIndex);

      if (startIndex >= finalSortedArray.length) {
        console.log("Array length " + finalSortedArray.length);

        return res.send({ message: "No more results" });
      }

      finalSortedArray = finalSortedArray.slice(startIndex, endIndex);
    }

    if (req.query.page) {
    }

    res.send(query);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const updateOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  try {
    const result = await productModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    console.log(result);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export const addRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const userLoggedInId = req.user;

  //find if user has already rated

  const userLoggedInID = new mongoose.Types.ObjectId(userLoggedInId);
  console.log("userId  "+ userLoggedInID);
  console.log("productid   "+ id);
  

  

  const alreadyRated = await productModel.count({
    _id: id,
    ratings: { $elemMatch: { postedBy: userLoggedInID }  },
  });

  console.log(alreadyRated);
  

  if (alreadyRated === 0) {
    const result = await productModel.findByIdAndUpdate({ _id: id },{ 
      $push: { ratings: {star:rating,postedBy:userLoggedInID, comment:comment  } },

    },{new: true});


    res.send(result );
  }else{
    const result1 = await productModel.findOneAndUpdate({ _id: id },{
      $pull: { ratings: {postedBy:userLoggedInID} },

    },{new: true} );


    const result = await productModel.findByIdAndUpdate({ _id: id },{ 
      $push: { ratings: {star:rating,postedBy:userLoggedInID , comment:comment } },

    },{new: true});



    res.send(result );

  }

  
};


export const getRatings = async (req:Request, res:Response)=>{

  const {id} = req.params

  console.log(id);
  
 // const ID = new mongoose.Types.ObjectId(productId);
  const product  = await productModel.find({_id:id})


    const ratingsArray = product[0].ratings

    let totalRatings = 0

    for(let i = 0; i < ratingsArray.length; i++){
          
         totalRatings =  totalRatings +  ratingsArray[i].star
          
    }

    const result = await productModel.findByIdAndUpdate({_id:id},{
      totalRating: totalRatings/ratingsArray.length
    },{new:true})





  res.send(result)






}



export const uploadPhoto = async (req: any, res: Response) => {



  try {

    if (!req.files) {
      console.log("No upload");
  
      res.send("No upload");
    }
  
    const { productId } = req.body;
  
    
  
    let result
    
    req.files.forEach(async (item:any)=>{
       result = await productModel.findByIdAndUpdate(
        { _id: productId},
        {
          $push: { images: item.filename },
        },
        { new: true }
      );
  
      
      
    })
  
  

  
    res.send({ filesUploaded:true});
    
  } catch (error) {

    res.send({filesUploaded:false,error:error})
    
  }



  
};
