import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan"
import connectDb from "./src/config/database";
import notFound from "./src/middlewares/errorhandler";

import userRoute from "./src/routes/userRoute";
import productRoute from "./src/routes/productRoute"
import blogRoute from "./src/routes/blogRoute"
import productCatRoute from "./src/routes/productCatRoute"
import brandRoute from "./src/routes/brandRoute"
import colourRoute from "./src/routes/colourRoute"
import blogCatRoute from "./src/routes/blogCatRoute"
import enquiryRoute from "./src/routes/enquiryRoute"
import couponRoute from "./src/routes/couponRoute"
import cartRoute from "./src/routes/cartRoute"

dotenv.config();   
const port = process.env.PORT || 9000;  

app.use(express.static("./public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/", userRoute);
app.use("/product", productRoute)
app.use("/blog", blogRoute)
app.use("/product-category", productCatRoute)   
app.use("/brand", brandRoute)   
app.use("/colour", colourRoute)   
app.use("/blog-category", blogCatRoute)   
app.use("/enquiry", enquiryRoute)   
app.use("/coupon", couponRoute)   
app.use("/cart", cartRoute)   


app.get("/", (req, res) => {
 

  res.send("success again");
});

app.use(notFound);

app.listen(port, async () => {
  console.log("Connecting to mongo...");
  await connectDb();
  console.log(`Listening on port ${port}`);  
});
