import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createCoupon,
  deleteCoupon,
  updateCoupon ,
  getAllCoupons,
  getOneCoupon
} from "../controllers/couponController";

router.post("/", validateToken, isAdmin, createCoupon);
router.delete("/:id", validateToken, isAdmin, deleteCoupon);
router.put("/:id", validateToken, isAdmin, updateCoupon);
router.get("/", validateToken, isAdmin, getAllCoupons);
router.get("/:id", validateToken, isAdmin, getOneCoupon);


export default router;