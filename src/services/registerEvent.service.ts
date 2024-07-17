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
      const data = await RegisterEvent.find({});
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