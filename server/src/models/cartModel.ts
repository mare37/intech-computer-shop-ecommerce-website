import mongoose from "mongoose";

import { Cart } from "../types";

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema<Cart>(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        colour: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.models.Cart ||   mongoose.model("Cart", cartSchema);