import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { User } from "../models";
import { message } from "../constants";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config'
@injectable()
export class AuthService{
    async signup(userData:IUser){
        try {
            await User.create(userData)
        } catch (error:any) {
            throw(error)
        }
    }

    async login(userData:IUser){
        try {
            const user=await User.findOne({email:userData.email})
            if(!user){
                throw new Error(message.USERNOTFOUND)
            }
            let isValidate=bcrypt.compare(userData.password,user.password)
            if(!isValidate){
                throw new Error(message.INVALIDCREDENTIALS)
            }
            const payload={
                _id:user._id,
                role:user.role
            }
            const token=jwt.sign(payload,config.get("SECRET_KEY") as string,{expiresIn:'2d'})
            return {accessToken:token,userData:user}
        } catch (error:any) {
            throw(error)
        }
    }
}