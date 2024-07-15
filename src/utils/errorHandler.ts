import { Request, Response, NextFunction } from "express";
import { statusCode } from "../constants";

export const errorHandler = (err: any) => {
    let message = "";
    if (err.Code === 11000) {
      return {
        statusCode: statusCode.BadRequest,
        message: "EMAIL IS ALREADY REGISTERED",
      };
    }
    if (err.name === "CastError") {
      return {
        statusCode: statusCode.BadRequest,
        message: "PROVIDED ID IS BOT VALID",
      };
    }
    if (err.name === "ValidationError") {
      for (let key in err.errors) {
        message += err.errors[key].message;
        message += ",";
      }
      return {
        statusCode: statusCode.BadRequest,
        message: message.slice(0, message.length),
      };
    }
    return { statusCode: statusCode.Error, message: err.message };
};
