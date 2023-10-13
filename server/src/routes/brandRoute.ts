import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createBrand,
  deleteBrand,
  getOneBrand,
  getAllBrands,
  updateBrand,
} from "../controllers/brandController";

router.post("/", validateToken, isAdmin, createBrand);
router.delete("/:id", validateToken, isAdmin, deleteBrand);
router.put("/:id", validateToken, isAdmin, updateBrand);
router.get("/", validateToken, isAdmin, getAllBrands);
router.get("/:id", validateToken, isAdmin, getOneBrand);

export default router;
