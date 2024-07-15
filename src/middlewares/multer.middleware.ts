import {Request,Response, NextFunction } from "express";
import multer from "multer";
import { errorHandler } from "../utils";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const multerErrorHandling=(err:any,req:Request,res:Response,next:NextFunction)=>{
    if (err instanceof multer.MulterError) {
       const errorMessage = errorHandler(err);
       return res.json({ status: false, ...errorMessage });
    } else{
     next()
    }
}

export const upload = multer({ storage: storage });
