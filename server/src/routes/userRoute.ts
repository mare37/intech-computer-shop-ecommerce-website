import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { validateToken } from "../JWT";
import isAdmin from "../middlewares/isAdmin";

import { body } from "express-validator/src/middlewares/validation-chain-builders";

import {
  register,
  login,
  getAllActiveUsers,
  getAllInactiveUsers,
  getOneuser,
  deleteOneuser,
  updateUser,
  refresh,
  logOut,
  changePassword,
  forgotpassword,
  renderChangePasswordPage,
  resetPassword,
} from "../controllers/userController";
//import notFound

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", register);
router.post("/login", login);
router.put("/changepassword", validateToken, changePassword);

router.put("/forgotpassword", forgotpassword);
router.get("/forgotpassword/:token", renderChangePasswordPage);

router.post(
  "/resetpassword",
  body("password").isLength({ min: 4 }),
  body("confirmpassword").isLength({ min: 4 }),
  resetPassword
);

router.get("/getallusers", validateToken, isAdmin, getAllActiveUsers);
router.get("/getallinactiveusers", validateToken, getAllInactiveUsers);
router.get("/getoneuser/:id", getOneuser);
router.delete("/getoneuser/:id", deleteOneuser);
router.put("/updateuser/:id", updateUser);
router.get("/refresh", refresh);
router.get("/logout", validateToken, logOut);

export default router;
