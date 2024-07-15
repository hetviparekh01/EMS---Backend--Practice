import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { User } from "../models";

@injectable()
export class UserService{
    async updateUser(userId:string,userData:IUser){
        try {
            await User.findByIdAndUpdate(userId,userData)
        } catch (error:any) {
            throw(error)
        }
    }

    async deleteUser(userId:string){
        try {
            await User.findByIdAndDelete(userId)
        } catch (error:any) {
            throw(error)
        }
    }

    async getAllUser(){
        try {
            const data=await User.find({})
            return data
        } catch (error:any) {
                throw(error)
        }
    }

    async getUserById(userId:string){
        try {
            const data=await User.findById(userId)
            return data
        } catch (error:any) {
            throw(error)
        }
    }
}