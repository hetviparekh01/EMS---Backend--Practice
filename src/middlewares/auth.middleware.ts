import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { message, statusCode } from "../constants";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';
import { errorHandler } from "../utils";

export class AuthMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction) {
        try {
            const token=req.headers.authorization?.split(" ")[1];
            if(!token){
                throw new Error(message.USERNOTLOGGEDIN)
            }
            const decoded=jwt.verify(token,config.get("SECRET_KEY")) as JwtPayload
            req.headers._id=decoded._id
            req.headers.role=decoded.role
            next();
        } catch (error:any) {
            const errorMessage = errorHandler(error);
            return res.json({ status: false,message:errorMessage });
        }
    }
}