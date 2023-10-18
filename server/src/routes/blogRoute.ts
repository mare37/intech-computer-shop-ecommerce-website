import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import isAdmin from "../middlewares/isAdmin";
import { upload, blogImgResize } from "../middlewares/upload";

import {
  createBlog,
  deleteBlog,
  updateBlog,
  getOneBlog,
  getAllBlogs,
  likeBlog,
  dislikeBlog,
  uploadPhoto,
} from "../controllers/blogController";

router.use(express.static("./public"));

router.post("/", validateToken, isAdmin, createBlog);
router.delete("/:id", validateToken, isAdmin, deleteBlog);
router.put("/:id", validateToken, isAdmin, updateBlog);
router.get("/:id", getOneBlog);
router.get("/", getAllBlogs);
router.put("/like/:blogId", validateToken, likeBlog);
router.put("/dislike/:blogId", validateToken, dislikeBlog);
router.post(
  "/uploadblogphoto",
  validateToken,
  isAdmin,
  upload.array("images"),
  blogImgResize,
  uploadPhoto
);

export default router;
