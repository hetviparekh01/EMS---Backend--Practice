import { Request, Response, NextFunction } from "express";
import { statusCode } from "../constants";

export const errorHandler = (err: any) => {
    let message = "";
    if (err.Code === 11000) {
      return "EMAIL IS ALREADY REGISTERED"
      
    }
    if (err.name === "CastError") {
      return "PROVIDED ID IS NOT VALID"
    }
    if (err.name === "ValidationError") {
      for (let key in err.errors) {
        message += err.errors[key].message;
        message += ",";
      }
      return  message.slice(0, message.length)
    }
    return err.message ;
};
