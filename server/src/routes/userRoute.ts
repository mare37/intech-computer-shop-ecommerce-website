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
  useCart,
  deleteCart,
  getOneCart,
  createOrder,
  getOrders,
  getMyOrders,
  addToWishList,
  applyCoupon
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
router.post("/cart", useCart);
router.delete("/empty-cart/:id", deleteCart);
router.get("/cart/:id", validateToken,  getOneCart);
router.post("/create-order", validateToken, createOrder)
router.get("/orders",validateToken,isAdmin, getOrders )
router.get("/orders/:userId",validateToken,getMyOrders )
router.post("/wishlist", validateToken, addToWishList);
router.post("/applycoupon", validateToken, applyCoupon);


export default router;
