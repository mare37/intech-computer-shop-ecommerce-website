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

router.post("/",  createCoupon);
router.delete("/:id", deleteCoupon);
router.put("/:id", updateCoupon);
router.get("/",  getAllCoupons);
router.get("/:id", getOneCoupon);


export default router;