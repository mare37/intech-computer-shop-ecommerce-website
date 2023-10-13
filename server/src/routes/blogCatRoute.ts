import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin";

import {
  createBlogCat,
  deleteBlogCat,
  updateBlogCat,
  getAllBlogCat,
  getOneBlogCat
} from "../controllers/blogCatController";

router.post("/", validateToken, isAdmin, createBlogCat);
router.delete("/:id", validateToken, isAdmin, deleteBlogCat);
router.put("/:id", validateToken, isAdmin, updateBlogCat);
router.get("/", validateToken, isAdmin, getAllBlogCat);
router.get("/:id", validateToken, isAdmin, getOneBlogCat);


export default router;
