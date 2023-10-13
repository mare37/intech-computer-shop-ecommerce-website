import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createProductCat,
  deleteProductCat,
  updateProductCat,
  getAllProductCat,
  getOneProductCat
} from "../controllers/productCatController";

router.post("/", validateToken, isAdmin, createProductCat);
router.delete("/:id", validateToken, isAdmin, deleteProductCat);
router.put("/:id", validateToken, isAdmin, updateProductCat);
router.get("/", validateToken, isAdmin, getAllProductCat);
router.get("/:id", validateToken, isAdmin, getOneProductCat);


export default router;
