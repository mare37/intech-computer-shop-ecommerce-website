import { Request, Response } from "express";
import brandModel from "../models/brandModel";

export const createBrand = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const result = await brandModel.create({ title: title });
    return res.send({ brandCreated: true, result: result });
  } catch (error) {
    console.log(error);

    res.send({ brandCreated: false, error: error });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await brandModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({ brandDeleted: true, result: result });
  } catch (error) {
    res.send({ brandDeleted: false, error: error });
  }
};

export const getOneBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await brandModel.findById({ _id: id });
    res.send({brandRetrieved: true, result: result });
  } catch (error) {
    res.send({ brandRetrieved: false,error: error });
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await brandModel.find({ status: "Active" });
    res.send({ brandsRetrieved: true, result: result })
  } catch (error) {
    res.send({ brandsRetrieved: false, error: error })
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  const title = req.body.title;

  try {
    const result = await brandModel.findByIdAndUpdate(
      { _id: id },
      { title: title },
      { new: true }
    );
    res.send({ brandUpdated: true, result: result });
  } catch (error) {
    res.send({ brandUpdated: false, error: error });
  }
};
