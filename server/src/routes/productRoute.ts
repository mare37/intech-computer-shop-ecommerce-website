import express, { Request, Response } from "express";
import { validateToken } from "../JWT";
import isAdmin from "../middlewares/isAdmin";


import {
  createProduct,
  getOneProduct,
  deleteOneProduct,
  getAllAciveProducts,
  updateOneProduct
} from "../controllers/productController";

const router = express.Router();

router.post("/",validateToken, isAdmin, createProduct);
router.get("/:id",validateToken, getOneProduct);
router.delete("/:id",validateToken,isAdmin, deleteOneProduct);
router.put("/:id",validateToken,isAdmin, updateOneProduct);
//router.get("/",validateToken, getAllAciveProducts);
router.get("/", getAllAciveProducts);




export default router;
