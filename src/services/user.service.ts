import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { RegisterEvent, User } from "../models";
import { ObjectId } from "mongodb";


@injectable()
export class UserService {
    async updateUser(userId: string, userData: IUser) {
        try {
            await User.findByIdAndUpdate(userId, userData)
        } catch (error: any) {
            throw (error)
        }
    }

    async deleteUser(userId: string) {
        try {
            await User.findByIdAndDelete(userId)
        } catch (error: any) {
            throw (error)
        }
    }

    async getAllUser() {
        try {
            const data = await User.find({})
            return data
        } catch (error: any) {
            throw (error)
        }
    }

    async getUserById(userId: string) {
        try {
            const data = await User.findById(userId)
            return data
        } catch (error: any) {
            throw (error)
        }
    }
    async getRegisterEvent(userId: string) {
        try {
            const data = await RegisterEvent.aggregate([
                {
                    $lookup: {
                        from: "events",
                        localField: "eventId",
                        foreignField: "_id",
                        as: "eventDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$eventDetails",
                    }
                },
                {
                    $match: {
                        userId: new ObjectId(userId)
                    }
                }
            ])
            return data
        } catch (error: any) {
            throw (error)
        }
    }
}