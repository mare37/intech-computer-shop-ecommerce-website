import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDb from "./src/config/database";
import notFound from "./src/middlewares/errorhandler";

//Importing routes
import userRoute from "./src/routes/userRoute";
import productRoute from "./src/routes/productRoute";
import blogRoute from "./src/routes/blogRoute";
import productCatRoute from "./src/routes/productCatRoute";
import brandRoute from "./src/routes/brandRoute";
import colourRoute from "./src/routes/colourRoute";
import blogCatRoute from "./src/routes/blogCatRoute";
import enquiryRoute from "./src/routes/enquiryRoute";
import couponRoute from "./src/routes/couponRoute";

dotenv.config();
const port = process.env.PORT || 9000;

app.use(express.static("./public"));
app.set("view engine", "ejs");

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", userRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/product-category", productCatRoute);
app.use("/api/brand", brandRoute);
app.use("/api/colour", colourRoute);
app.use("/api/blog-category", blogCatRoute);
app.use("/api/enquiry", enquiryRoute);
app.use("/api/coupon", couponRoute); 
 
app.get("/", (req, res) => {
  res.send("success again"); 
}); 

app.use(notFound);

app.listen(port, async () => {
  console.log("Connecting to mongo...");
  await connectDb();
  console.log(`Listening on port ${port}`);
}); 
