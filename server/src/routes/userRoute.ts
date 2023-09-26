import express, { Request, Response } from "express";
import { validateToken } from "../JWT";
import isAdmin from "../middlewares/isAdmin";

import { 
  register,
  login,
  getAllActiveUsers,
  getAllInactiveUsers,
  getOneuser,
  deleteOneuser,
  updateUser,
  refresh,
  logOut
} from "../controllers/userController";
//import notFound

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getallusers",validateToken,isAdmin, getAllActiveUsers);
router.get("/getallinactiveusers",validateToken, getAllInactiveUsers);
router.get("/getoneuser/:id", getOneuser);
router.delete("/getoneuser/:id", deleteOneuser);
router.put("/updateuser/:id", updateUser);
router.get("/refresh", refresh);
router.get("/logout",validateToken, logOut);



export default router;
