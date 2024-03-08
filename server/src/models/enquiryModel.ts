import mongoose from "mongoose";

import { Enquiry } from "../types";

// Declare the Schema of the Mongo model
var enquirySchema = new mongoose.Schema<Enquiry>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    enquiryStatus: {
      type: String,
      default: "Unread",
      enum: ["Unread", "Read"],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", enquirySchema);
