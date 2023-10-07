import express from "express";
const router = express.Router();
import { validateToken } from "../JWT";
import multer from "multer"
import isAdmin from "../middlewares/isAdmin";


const upload = multer({ dest: 'uploads/' })


import {
  createBlog,
  deleteBlog,
  updateBlog,
  getOneBlog,
  getAllBlogs,
  likeBlog,
  dislikeBlog,
  uploadPhoto
} from "../controllers/blogController";


router.post("/",validateToken, createBlog);
router.delete("/:id",validateToken, deleteBlog);
router.put("/:id",validateToken, updateBlog);
router.get("/:id", getOneBlog);
router.get("/", getAllBlogs);
router.put("/like/:blogId",validateToken, likeBlog);
router.put("/dislike/:blogId",validateToken, dislikeBlog);
router.post("/uploadblogphoto", validateToken,upload.single('image'),uploadPhoto )


export default router;
