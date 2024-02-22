const mongoose = require("mongoose"); // Erase if already required


type orderStatus={
  status:string
  colour:string

}

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: Object,
      default: {status: "Not Processed", colour: "red"},
      enum: [
        {status: "Not Processed", colour: "red"},
        {status: "Processing", colour: "blue"},
        {status: "Dispatched", colour: "orange"},
        {status: "Cancelled", colour: "red"},
        {status: "Delivered", colour: "green"},
      ],
    },
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
export default mongoose.models.Order || mongoose.model("Order", orderSchema);