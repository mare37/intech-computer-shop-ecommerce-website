import { Request, Response } from "express";
import couponModel from "../models/couponModel";

export const createCoupon = async (req: Request, res: Response) => {
  const { name, expiry, discount } = req.body;

  

    try {
      const result = await couponModel.create( 
        { name: name, expiry:expiry, discount:discount },
      );
    return  res.send({ couponCreated: true, result: result });
    } catch (error) {
      res.send({ couponCreated: false, error: error });
    }
  
};

export const deleteCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await couponModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({couponRemoved: true, result: result });
  } catch (error) {
    res.send({couponRemoved: false, error: error });
  }
};

export const getOneCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await couponModel.findById({ _id: id });
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error });
  }
};

export const getAllCoupons = async (req: Request, res: Response) => {
  

  try {
    const result = await couponModel.find({status:"Active"});
    res.send({ couponsRetrieved: true, result: result });
  } catch (error) {
    res.send({ couponsRetrieved: false, error: error });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, expiry, discount } = req.body;

  try {
    const result = await couponModel.findByIdAndUpdate(
      { _id: id },
      { name: name, expiry:expiry, discount:discount },
      { new: true }
    );
    res.send({couponUpdated: true, result: result });
  } catch (error) {
    res.send({couponUpdated: false, error: error });
  }
};
