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

router.post("/", validateToken, isAdmin, createColour);
router.delete("/:id", validateToken, isAdmin, deleteColour);
router.put("/:id", validateToken, isAdmin, updateColour);
router.get("/", validateToken, isAdmin, getAllColours);
router.get("/:id", validateToken, isAdmin, getOneColour);

export default router;