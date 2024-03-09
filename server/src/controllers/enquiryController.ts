import { Request, Response } from "express";
import enquiryModel from "../models/enquiryModel"

export const createEnquiry = async (req: Request, res: Response) => {
  const { name, email, mobile, comment } = req.body;

  

    try {
      const result = await enquiryModel.create( 
        { name: name, email:email, mobile:mobile, comment:comment },
      );
    return  res.send({ enquiryCreated: true, result: result });
    } catch (error) {
      res.send({ enquiryCreated: false, error: error });
    }
  
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await enquiryModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({enquiryDeleted: true, result: result });
  } catch (error) {
    res.send({enquiryDeleted: false, error: error });
  }
};

export const getOneEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await enquiryModel.findById({ _id: id });
    res.send({enquiryRetrieved: true, result: result });
  } catch (error) {
    res.send({enquiryRetrieved: false, error: error });
  }
};

export const getAllEnquirys = async (req: Request, res: Response) => {
  

  try {
    const result = await enquiryModel.find({status:"Active"});
    res.send({enquiriesRetrieved:true, result: result });
  } catch (error) { 
    res.send({enquiriesRetrieved:false, error: error });
  }
};

export const updateEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { enquiryStatus } = req.body;

  try {
    const result = await enquiryModel.findByIdAndUpdate(
      { _id: id },
      { enquiryStatus: enquiryStatus},
      { new: true }
    );
    res.send({enquiryUpdated: true, result: result });
  } catch (error) {
    res.send({enquiryUpdated: false, error: error });
  }
};
