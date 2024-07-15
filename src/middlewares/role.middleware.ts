import {Request,Response, NextFunction } from "express"
import { message, statusCode } from "../constants"
import { errorHandler } from "../utils"

export const RoleMiddleware=(roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const userRole=req.headers.role as string
            if(!roles.includes(userRole)){
                throw new Error(message.UNAUTHORIZEDACCESS)
            }
            next()
        } catch (error:any) {
                const errorMessage = errorHandler(error);
                return res.json({ status: false, ...errorMessage });
        }
    }
}