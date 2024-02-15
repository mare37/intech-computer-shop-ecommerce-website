import { Request, Response } from "express";
import blogCatModel from "../models/blogCatModel";

export const createBlogCat = async (req: Request, res: Response) => {
  const { title } = req.body;

  

    try {
      const result = await blogCatModel.create( 
        { title: title },
      );
    return  res.send({ blogCatCreated: true, result: result });
    } catch (error) {
      res.send({ blogCatCreated: false, error: error });
    }
  
};

export const deleteBlogCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await blogCatModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({ blogCatDeleted: true, result: result });
  } catch (error) {
    res.send({ blogCatDeleted: false, error: error });
  }
};

export const getOneBlogCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await blogCatModel.findById({ _id: id });
    res.send({blogCatRetrieved: true, result: result }); 
  } catch (error) {
    res.send({blogCatRetrieved: false, error: error }); 
  }
};

export const getAllBlogCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await blogCatModel.find({status: "Active"});
    res.send({blogCatRetrieved: true, result: result }); 
  } catch (error) {
    console.log(error);
    
    res.send({ error: error });
  }
};

export const updateBlogCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  const title = req.body.title;

  try {
    const result = await blogCatModel.findByIdAndUpdate(
      { _id: id },
      { title: title },
      { new: true }
    );
    res.send({blogCatUpdated: true, result: result });
  } catch (error) {
    res.send({blogCatUpdated: false, error: error });
  }
};
