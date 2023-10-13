import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createEnquiry,
  deleteEnquiry,
  updateEnquiry,
  getAllEnquirys,
  getOneEnquiry
} from "../controllers/enquiryController";

router.post("/", validateToken, isAdmin, createEnquiry);
router.delete("/:id", validateToken, isAdmin, deleteEnquiry);
router.put("/:id", validateToken, isAdmin, updateEnquiry);
router.get("/", validateToken, isAdmin, getAllEnquirys);
router.get("/:id", validateToken, isAdmin, getOneEnquiry);


export default router;