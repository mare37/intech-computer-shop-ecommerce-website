import mongoose from "mongoose";
import { Blog } from "../types";

import { Schema } from "mongoose";

// Declare the Schema of the Mongo model
const blogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    status: {
        type: String,
        default:"Active"
      },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    author: {
      type: String,
      default: "Admin",
    },
    images: [],
  },
  {
    
    timestamps: true,
  }
);

//Export the model
export default mongoose.models.Blog || mongoose.model<Blog>("Blog", blogSchema)




/*toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },*/