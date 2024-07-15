import { injectable } from "inversify";
import { IEvent } from "../interfaces";
import { Event } from "../models";

@injectable()
export class EventService {
  async addEvent(eventData: IEvent) {
    try {
      await Event.create(eventData);
    } catch (error: any) {
      throw (error);
    }
  }

  async updateEvent(eventId: string, eventData: IEvent) {
    try {
      await Event.findByIdAndUpdate(eventId, eventData);
    } catch (error: any) {
      throw (error);
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await Event.findByIdAndDelete(eventId);
    } catch (error: any) {
      throw (error);
    }
  }

  async getAllEvent() {
    try {
      const data = await Event.find({});
      return data;
    } catch (error: any) {
      throw (error);
    }
  }

  async geteventById(eventId: string) {
    try {
      const data = await Event.findById(eventId);
      return data;
    } catch (error: any) {
      throw (error);
    }
  }
}
