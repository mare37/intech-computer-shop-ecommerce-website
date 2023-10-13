import { ObjectId } from "mongoose";

export type array = {
  cart: [];
};

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: Number;
  password: string;
  role: string;
  refreshToken: string;
  status: string;
  cart: array;
  passwordChangedAt: Date;
  passwordResetExpires: Date;
  passwordResetToken: String;
}

export interface Product {
  title: string;
  slug: string;
  description: string;
  price: number;
  sold: number;
  brand: number;
  status: string;
  category: ObjectId;
  quantity: number;
  images?: Array<string>;
  color: string;
  ratings: [];
}

export interface Blog {
  title: string;
  description: string;
  status: string;
  category: string;
  numViews: number;
  isLiked: boolean;
  isDisliked: boolean;
  likes: [];
  dislikes: [];
  author: string;
  images?: Array<string>;
  color: string;
  ratings: [];
}

export interface ProductCategory {
  title: string;
  status: string;
}

export interface Brand {
  title: string;
  status: string;
}

export interface Colour {
  title: string;
  status: string;
}

export interface BlogCategory {
  title: string;
  status: string;
}

export interface Enquiry {
  name: string;
  email: string;
  mobile: string;
  comment: string;
  enquiryStatus: string;
  status: string;
}

export interface Coupon {
  name: string;
  expiry: Date;
  discount: number;
  status: string;
}

export interface Cart {
  products: [];
  cartTotal: number;
  totalAfterDiscount: number;
  orderby: ObjectId
}

export interface UserPayload {
  email: string;
  id: string;
}

export interface UserRequest {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  mobile: Number;
  role: string;
  status: string;
}
