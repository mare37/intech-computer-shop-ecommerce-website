import mongoose from "mongoose";

import { Coupon } from "../types";

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema<Coupon>({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  status:{
    type:String,
    default:"Active"
  },
});

//Export the model
export default   mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);