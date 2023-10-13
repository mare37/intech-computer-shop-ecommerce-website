import { Request, Response } from "express";
import colourModel from "../models/colorModel";

export const createColour = async (req: Request, res: Response) => {
  const { title } = req.body;

  

    try {
      const result = await colourModel.create( 
        { title: title },
      );
    return  res.send({ colourCreated: true, result: result });
    } catch (error) {
      res.send({  colourCreated: false, error: error });
    }
  
};

export const deleteColour = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await colourModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" },
      { new: true }
    );
    res.send({ colourDeleted: true, result: result });
  } catch (error) {
    res.send({ colourDeleted: false, error: error });
  }
};

export const getOneColour = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await colourModel.findById({ _id: id });
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error });
  }
};

export const getAllColours = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await colourModel.find();
    res.send({ result: result });
  } catch (error) {
    res.send({ error: error });
  }
};

export const updateColour = async (req: Request, res: Response) => {
  const { id } = req.params;

  const title = req.body.title;

  try {
    const result = await colourModel.findByIdAndUpdate(
      { _id: id },
      { title: title },
      { new: true }
    );
    res.send({ colourUpdated: true, result: result });
  } catch (error) {
    res.send({ colourUpdated: false, error: error });
  }
};
