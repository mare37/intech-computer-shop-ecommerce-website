import express, { Request, Response } from "express";
import { validateToken } from "../JWT";
import isAdmin from "../middlewares/isAdmin";
const router = express.Router();
import { upload, productImgResize } from "../middlewares/upload";

import {
  createProduct,
  getOneProduct,
  deleteOneProduct,
  getAllAciveProducts,
  updateOneProduct,
  addRating,
  getRatings,
  uploadPhoto,
} from "../controllers/productController";

router.post("/",  createProduct);
router.get("/:id", getOneProduct);
router.delete("/:id", deleteOneProduct);
router.put("/:id",  updateOneProduct);
router.get("/",  getAllAciveProducts);
router.post("/rating/:id",  addRating);
router.get("/ratings/:id", getRatings);
router.post(
  "/uploadproductphoto",
 
  upload.array("images"),
  productImgResize,
  uploadPhoto
);

export default router;
