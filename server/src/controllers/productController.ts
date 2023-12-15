import { Request, Response } from "express";
import slugify from "slugify";
import productModel from "../models/productModel";
import _ from "lodash";
import mongoose from "mongoose";

import { Product } from "../types";

import splitString from "../utils/splitstring";
import limitFields from "../utils/limitfields";

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body.productObject);

  const {productObject} = req.body;

  console.log(productObject);
  

  
     productObject.slug = slugify(productObject.title); 
  

  try {
    const result = await productModel.create(productObject);

    console.log(result);
    res.send({ productCreated: true, result: result });
    //res.send(result);
  } catch (err) {
    console.log(err);
    res.send({ productCreated: false, err: err});
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  var populateQuery = [
    { path: "brand", select: "title" },
    { path: "category", select: "title" },
  ];

  try {
    const product = await productModel.findById({ _id: id }).populate(populateQuery)
    res.send({ productRetrieved: true, result: product});
  } catch (err) {
    console.log(err);
    res.send({ productRetrieved: false, err: err});
  }
};

export const deleteOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const product = await productModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" }
    );
    res.send({ productDeleted: true, result: product});
  } catch (err) {
    console.log(err);
    res.send({ productDeleted: false, err:err});
  }
};

export const getAllAciveProducts = async (req: Request, res: Response) => {
  try {
    const queryObject = { ...req.query }; 

   
    


    let finalSortedArray: any;

    console.log(queryObject);

    const excluded = ["limit", "sort", "page", "fields"];

    excluded.forEach((query) => {
      delete queryObject[query];
    });

    console.log(queryObject);

    var populateQuery = [
      { path: "brand", select: "title" },
      { path: "category", select: "title" },
    ];

    let query: any = productModel.find(queryObject).populate(populateQuery)

    

    //Sort
    if (req.query.sort) {
      const sort = { ...req.query };

      const sortProperties = sort.sort?.toString();
      query = query.sort(sortProperties);
    } else {
      query = query.sort("createdAt");
    }

    //Limit fields
    if (req.query.fields) {
      const object = { ...req.query };

      const fields = object.fields;

      if (typeof fields === "string") {
        let fieldsString = fields.split(",").join(" ");

        query = query.select(fieldsString.toString());
      }
    }

    //Pagination

    const { page, limit } = req.query;

    if (typeof page === "string" && typeof limit === "string") {
      console.log("WE HERE");

      let queryArray = await query;

      const startIndex = (parseInt(page) - 1) * parseInt(limit);

      const endIndex = startIndex + parseInt(limit);

      console.log("Start  " + startIndex + "     End  " + endIndex);

      if (startIndex >= queryArray.length) {
        console.log("Array length " + queryArray.length);

        return res.send({ message: "No more results" });
      }

      //  console.log(query);

      queryArray = queryArray.slice(startIndex, endIndex);
      return res.send(queryArray);
    }

    let final = await query

    console.log(final);
    
    res.send({ productRetrieved: true, result: final });
  } catch (err) {
    console.log(err);
    res.send({ productRetrieved: false,err:err });
  }
};

export const updateOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  console.log(req.body);
  const {productObject} = req.body;
  productObject.slug = slugify(productObject.title); 

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  try {
    const result = await productModel.findByIdAndUpdate({ _id: id }, productObject, {
      new: true,
    });

    console.log(result);

    res.send({ productUpdated: true, result: result });
  } catch (err) {
    console.log(err);
    res.send({ productUpdated: false, err:err});
  }
};

export const addRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const userLoggedInId = req.user;

  //find if user has already rated

  const userLoggedInID = new mongoose.Types.ObjectId(userLoggedInId);
  console.log("userId  " + userLoggedInID);
  console.log("productid   " + id);

  const alreadyRated = await productModel.count({
    _id: id,
    ratings: { $elemMatch: { postedBy: userLoggedInID } },
  });

  console.log(alreadyRated);

  if (alreadyRated === 0) {
    const result = await productModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          ratings: { star: rating, postedBy: userLoggedInID, comment: comment },
        },
      },
      { new: true }
    );

    res.send(result);
  } else {
    const result1 = await productModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { ratings: { postedBy: userLoggedInID } },
      },
      { new: true }
    );

    const result = await productModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          ratings: { star: rating, postedBy: userLoggedInID, comment: comment },
        },
      },
      { new: true }
    );

    res.send(result);
  }
};

export const getRatings = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  // const ID = new mongoose.Types.ObjectId(productId);
  const product = await productModel.find({ _id: id });

  const ratingsArray = product[0].ratings;

  let totalRatings = 0;

  for (let i = 0; i < ratingsArray.length; i++) {
    totalRatings = totalRatings + ratingsArray[i].star;
  }

  const result = await productModel.findByIdAndUpdate(
    { _id: id },
    {
      totalRating: totalRatings / ratingsArray.length,
    },
    { new: true }
  );

  res.send(result);
};

export const uploadPhoto = async (req: any, res: Response) => {
  try {
    if (!req.files) {
      console.log("No upload");

      res.send("No upload");
    }

    const { productId } = req.body;

    let result;

    req.files.forEach(async (item: any) => {
      result = await productModel.findByIdAndUpdate(
        { _id: productId },
        {
          $push: { images: item.filename },
        },
        { new: true }
      );
    });

    res.send({ filesUploaded: true });
  } catch (error) {
    res.send({ filesUploaded: false, error: error });
  }
};
