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

router.post("/", validateToken, isAdmin, createProduct);
router.get("/:id", validateToken, getOneProduct);
router.delete("/:id", validateToken, isAdmin, deleteOneProduct);
router.put("/:id", validateToken, isAdmin, updateOneProduct);
router.get("/", validateToken, getAllAciveProducts);
router.post("/rating/:id", validateToken, addRating);
router.get("/ratings/:id", validateToken, getRatings);
router.post(
  "/uploadproductphoto",
  validateToken,
  isAdmin,
  upload.array("images"),
  productImgResize,
  uploadPhoto
);

export default router;
