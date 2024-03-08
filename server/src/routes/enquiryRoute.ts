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

router.post("/", createEnquiry);
router.delete("/:id",  deleteEnquiry);
router.put("/:id",  updateEnquiry);
router.get("/", getAllEnquirys);
router.get("/:id",  getOneEnquiry);


export default router;