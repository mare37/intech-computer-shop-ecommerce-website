import mongoose from "mongoose";
import { ObjectId } from "mongoose";

import { Schema } from "mongoose";
import { Brand } from "../types";

const brandSchema = new Schema<Brand>(
  {
    title: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Brand || mongoose.model("Brand", brandSchema);
