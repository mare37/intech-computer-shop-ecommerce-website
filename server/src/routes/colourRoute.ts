import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createColour,
  updateColour,
  getAllColours,
  getOneColour,
  deleteColour,
} from "../controllers/colourController";

router.post("/",  createColour);
router.delete("/:id",  deleteColour);
router.put("/:id",  updateColour);
router.get("/",  getAllColours);
router.get("/:id",  getOneColour);

export default router;