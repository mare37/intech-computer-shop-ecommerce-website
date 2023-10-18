import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createCart,
  deleteCart,
  updateCart ,
  getAllCart,
  getOneCart,
  removeFromCart
} from "../controllers/cartConroller";

router.post("/", validateToken,createCart);
router.delete("/:orderby", validateToken, deleteCart);
router.put("/", validateToken, updateCart);
router.put("/:cartProductId", validateToken, removeFromCart);
router.get("/", validateToken, getAllCart);
router.get("/:orderby", validateToken,  getOneCart);


export default router;