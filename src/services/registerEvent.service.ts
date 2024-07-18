import { injectable } from "inversify";
import { IRegisterEvent } from "../interfaces";
import { RegisterEvent } from "../models";

@injectable()
export class RegisterEventService {
  async registerEvent(registerData: IRegisterEvent) {
    try {
      const data = await RegisterEvent.create(registerData);
      // return data
    } catch (error: any) {
      throw (error);
    }
  }

  async getAllRegisteredEvent() {
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
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {
          $unwind: {
            path: "$eventDetails"
          }
        },
        {
          $unwind: {
            path: "$userDetails",
          }
        },
        {
          $project: {
            "userDetails.userName": 1,
            "ticketQuantity": 1,
            "finalAmt": 1,
            "createdAt": 1,
            "eventDetails.eventName": 1,
            "eventDetails.date": 1
          }
        }
      ]);
      return data;
    } catch (error: any) {
      throw (error);
    }
  }

  async getRegisterEventById(registerId: string) {
    try {
      const data = await RegisterEvent.findById(registerId);
      return data;
    } catch (error: any) {
      throw (error);
    }
  }
  async getAllRegisteredEventForUser(userId: string) {
    try {
      const data = await RegisterEvent.find({ userId: userId });
      return data;
    } catch (error: any) {
      throw (error);
    }
  }
}