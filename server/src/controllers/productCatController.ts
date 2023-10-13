import { Request, Response } from "express";
import productCatModel from "../models/productCatModel";

export const createProductCat = async (req: Request, res: Response) => {
  const { title } = req.body;

  

    try {
      const result = await productCatModel.create( 
        { title: title },
      );
    return  res.send({ productCatCreated: true, result: result });
    } catch (error) {
      res.send({ productCatCreated: false, error: error });
    }
  
};

export const deleteProductCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await productCatModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({ productCatDeleted: true, result: result });
  } catch (error) {
    res.send({ productCatDeleted: false, error: error });
  }
};

export const getOneProductCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await productCatModel.findById({ _id: id });
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error });
  }
};

export const getAllProductCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await productCatModel.find();
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error });
  }
};

export const updateProductCat = async (req: Request, res: Response) => {
  const { id } = req.params;

  const title = req.body.title;

  try {
    const result = await productCatModel.findByIdAndUpdate(
      { _id: id },
      { title: title },
      { new: true }
    );
    res.send({ productCatDeleted: true, result: result });
  } catch (error) {
    res.send({ productCatDeleted: false, error: error });
  }
};
