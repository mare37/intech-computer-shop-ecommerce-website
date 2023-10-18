import { Request,Response, NextFunction} from "express";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import { log } from "console";
const fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callBack(
      null,
      file.fieldname + "-" + Date.now() +  path.extname(file.originalname)
    );
  },
});

//


const fileFilter  = (req :Request, file:any, cb:any ) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter :fileFilter,
  //limits:{fileSize:1000000}
});


const blogImgResize = async (req:Request, res:Response, next: NextFunction) => {
  if (!req.files) return next();

   if(req.files.constructor === Array ){

  

    await Promise.all(
      req.files.map(async (file:any) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/blogs/${file.filename}`).then((data:any)=>{
            console.log(data);
            
          })

            fs.unlinkSync(`public/images/${file.filename}`);
      })
    );

   }
 
  next();
};


const productImgResize = async (req:Request, res:Response, next: NextFunction)=> {
  if (!req.files) return next();

  if(req.files.constructor === Array ){

    await Promise.all(
      req.files.map(async (file: any) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/products/${file.filename}`);
       
          fs.unlinkSync(`public/images/${file.filename}`);
      })
    );



  }




  
  next();
};

export {upload, blogImgResize, productImgResize} 
