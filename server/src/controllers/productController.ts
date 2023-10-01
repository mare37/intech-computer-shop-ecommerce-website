import { Request, Response } from "express";
import slugify from "slugify";
import productModel from "../models/productModel";
import _ from "lodash";

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

export const getAllAciveProducts = async (req: Request, res: Response) => {
  try {
    const queryObject = { ...req.query };
    let finalSortedArray : any
    //console.log(sort);

    console.log(queryObject);

    const excluded = ["limit", "sort", "page", "fields"];

    excluded.forEach((query) => {
      delete queryObject[query];
    });

    //  console.log(queryObject);

    

    const query = await  productModel.find(queryObject)

    

    if (req.query.sort) {
      const sort = { ...req.query };

      console.log("we are sorting now");
      console.log(sort.sort);



      //Extracting sort options from query
      let sortstring = sort.sort;
     

      console.log(sortstring);
       

      //covert sort options from query into array of strings
      const  arrayOfSortOptions = splitString(sortstring);

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
      const fields  = req.query.fields;



      if (typeof fields === 'string') {

        let fieldsString   = fields.split(",").join(" ");

        console.log(fieldsString);
     


      const query = await  productModel.find(queryObject)

      

      
      

      finalSortedArray = query



      }

     

    }

    //Pagination

    const {page, limit }  =req.query ;

    if (typeof page === 'string' && typeof limit === 'string' ) {

      console.log("WE HERE");
      

      const startIndex  = (parseInt(page) - 1) * parseInt(limit) ;

      const endIndex =  startIndex  + parseInt(limit)

      console.log("Start  " + startIndex + "     End  " + endIndex);

      if(startIndex >=   finalSortedArray.length  ){

        console.log("Array length " +  finalSortedArray.length);
        

       return res.send({message:"No more results"}); 



      }
      

      finalSortedArray = finalSortedArray.slice( startIndex ,endIndex)
    }

    if(req.query.page){

      


    }
    
    
   














    res.send(finalSortedArray); 
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
