import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import cors from "cors"

import {
  createBrand,
  deleteBrand,
  getOneBrand,
  getAllBrands,
  updateBrand,
} from "../controllers/brandController";

router.use(cors({ origin: true, credentials: true }));


router.post("/",  createBrand);
router.delete("/:id",  deleteBrand);
router.put("/:id", updateBrand);
router.get("/",  getAllBrands);
router.get("/:id",  getOneBrand);

export default router;
