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

router.post("/", createBlogCat);
router.delete("/:id",  deleteBlogCat);
router.put("/:id",updateBlogCat);
router.get("/",  getAllBlogCat);
router.get("/:id", getOneBlogCat);


export default router;
