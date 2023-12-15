import mongoose from "mongoose";
import { ObjectId } from "mongoose";

import { Schema } from "mongoose";
import { Product } from "../types";

const productSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
      select: false,
    },

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand"
    },
    status: {
      default: "Active",
      type: String,
      required: true,
      select: false,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "ProductCategory",
    },
    quantity: Number,
    images: [],

    colour: {
      type: mongoose.Schema.ObjectId,
      ref: "Colour",
    },

    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
        comment: String,
      },
    ],

    totalRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
