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

router.post("/", createProductCat);
router.delete("/:id",  deleteProductCat);
router.put("/:id",updateProductCat);
router.get("/",  getAllProductCat);
router.get("/:id",  getOneProductCat);


export default router;
