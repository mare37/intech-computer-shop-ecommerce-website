import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import { createToken, createRefreshToken } from "../JWT";
import jwt from "jsonwebtoken";

import validateMongoID from "../middlewares/validateMongoId";

export const register = async (req: Request, res: Response) => {
  console.log(req.body);

  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    const User = await userModel.find({
      email: email,
    });

    if (User.length > 0) {
      throw new Error("Email already exists");
      // return res.send({registration:false, message:"Email already exists"})
    }
  } catch (err) {
    console.log(err);

    return res.send({ registration: false, message: "Email already exists" });
  }

  try {
    const UserMobile = await userModel.find({
      mobile: mobile,
    });

    if (UserMobile.length > 0) {
      throw new Error("Mobile number already exists");
      //res.send({registration:false, message:"Email already exists"})
    }
  } catch (err) {
    console.log(err);
    return res.send({
      registration: false,
      message: "Mobile number already exists",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    console.log(hashPassword);

    const registerUser = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: hashPassword,
    });

    console.log(registerUser);

    res.send({ registration: true, message: "Registration succesfull" });
  } catch (err) {
    console.log(err);

    res.send({ registration: false, err: err });
  }

  // console.log(User);

  /*  if(User.length > 0 || UserMobile.length > 0  ){
        res.send({registration:false, message:"Email or Mobile already exists"})
    }else{


     

     

    }*/
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const User = await userModel.find({ email: email });

    if (User.length === 0) throw new Error("User not registered");

    console.log(User);

    if (User.length > 0) {
      // we have found user

      const dbpassword = User[0].password;

      const match = await bcrypt.compare(password, dbpassword);

      if (match) {
        console.log(match);

        const accessToken = createToken({
          email: User[0].email,
          id: User[0]._id.toString(),
        });
        const refreshToken = createToken({
          email: User[0].email,
          id: User[0]._id.toString(),
        });

        //if there is no secret they return false else they returns a string
        if (!accessToken) throw new Error("Secret required");
        if (!refreshToken) throw new Error("Secret required");
        const id = User[0]._id.toString();
        console.log(id);

        const result = await userModel.findByIdAndUpdate(
          { _id: id },
          { refreshToken },
          { new: true }
        );

        res.cookie("access_token", accessToken, {
          maxAge: 60 * 60 * 60,
          httpOnly: true,
          secure: true,
        });

        res.cookie("refresh_token", refreshToken, {
          maxAge: 60 * 60 * 60 * 60 * 60,
          httpOnly: true,
          secure: true,
        });

        res
          .send({
            auth: true,
            message: "You are logged in!",
            result: result,
          })
          .status(200);
      } else {
        res
          .send({
            auth: false,
            message: "Wrong password!",
          })
          .status(401);
      }
    }
  } catch (err) {
    console.log(err);
    res
      .send({
        auth: false,
        err: err,
      })
      .status(401);
  }
};

export const logOut = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refresh_token"];

  if (!refreshToken) {
     return res.send("Error no token");
  }

  const User = await userModel.findOneAndUpdate(
    { refreshToken: refreshToken },
    { refreshToken: "" }
  );

  if (!User) {
     return  res.send("Token is invalid");
  }

  res.clearCookie("access_token", {
    httpOnly: true,
    secure: true,
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
  });

  res.status(200).send("You have logged out");
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refresh_token"];
  const SECRET = process.env.SECRET || "";

  try {
    if (!refreshToken) {
      return res
        .send({
          auth: false,
          message: "Login to continue",
        })
        .status(401);
    }

    const User = await userModel.find({ refreshToken: refreshToken });

    console.log(User);

    jwt.verify(refreshToken, SECRET, async function (err: any, decoded: any) {
      if (err) {
        return res.send(err);
      }

      if (User[0]?.email === decoded?.email) {
        const accessToken = jwt.sign(
          { email: User[0].email, id: User[0]._id.toString() },
          SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("access_token", accessToken, {
          maxAge: 60 * 60,
          httpOnly: true,
          secure: true,
        });

        res.send(User);
      } else {
        res
          .send({
            auth: false,
            message: "Invalid token",
          })
          .status(401);
      }
    });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

export const getAllActiveUsers = async (req: Request, res: Response) => {
  try {
    const AllUsers = await userModel.find({ status: "Active" });

    res.send(JSON.stringify(AllUsers));
  } catch (err) {
    console.log(err);
  }
};

export const getAllInactiveUsers = async (req: Request, res: Response) => {
  try {
    const AllUsers = await userModel.find({ status: "Inactive" });

    res.send(JSON.stringify(AllUsers));
  } catch (err) {
    console.log(err);
  }
};

export const getOneuser = async (req: Request, res: Response) => {
  const { id } = req.params;

  validateMongoID(id);

  try {
    const User = await userModel.findById({ _id: id });

    console.log(User);

    res.send(JSON.stringify(User));
  } catch (err) {
    console.log(err);
  }
};

export const deleteOneuser = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  try {
    const result = await userModel.findByIdAndUpdate(
      { _id: id },
      { status: "Inactive" }
    );

    res.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, mobile } = req.body;
  const body = req.body;

  console.log(id);

  try {
    const UserMobile = await userModel.find({
      mobile: mobile,
    });

    if (UserMobile.length > 0) {
      throw new Error("Mobile number already exists");
      //res.send({registration:false, message:"Email already exists"})
    }
  } catch (err) {
    console.log(err);
    return res.send({
      updateUser: false,
      message: "Mobile number already exists",
    });
  }

  try {
    const result = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
      },
      { new: true }
    );

    console.log(result);

    res.send(JSON.stringify(result));
  } catch (err) {
    console.log(err);
  }
};
