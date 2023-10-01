import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import connectDb from "./src/config/database";
import notFound from "./src/middlewares/errorhandler";

import userRoute from "./src/routes/userRoute";
import productRoute from "./src/routes/productRoute"

dotenv.config();   
const port = process.env.PORT || 9000;  

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use("/", userRoute);
app.use("/product", productRoute)

app.get("/", (req, res) => {
  console.log("hellkj");

  res.send("success again");
});

app.use(notFound);

app.listen(port, async () => {
  console.log("Connecting to mongo...");
  await connectDb();
  console.log(`Listening on port ${port}`);
});
