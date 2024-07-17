import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { message, statusCode, TYPES } from "../constants";
import { EventService } from "../services";
import { multerErrorHandling, RoleMiddleware, upload } from "../middlewares";
import { Request, Response } from "express";
import { errorHandler } from "../utils";

@controller("/event", TYPES.AuthMiddleware)
export class EventController {
  constructor(
    @inject<EventService>(TYPES.EventService) private eventService: EventService
  ) {}

  @httpPost("/addEvent", RoleMiddleware(["admin"]))
  async addEvent(req: Request, res: Response) {
    try {
      const eventData = req.body;
      console.log(eventData);
      await this.eventService.addEvent(eventData);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.EVENTCREATED });
    } catch (error: any) {
          const errorMessage = errorHandler(error);
           return res.json({ status: false, ...errorMessage });
    }
  }

  @httpPut("/updateEvent/:id", RoleMiddleware(["admin"]))
  async updateEvent(req: Request, res: Response) {
    try {
      const eventData = req.body;
      const { id } = req.params;
      await this.eventService.updateEvent(id, eventData);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.EVENTUPDATED });
    } catch (error: any) {
        const errorMessage = errorHandler(error);
        return res.json({ status: false, ...errorMessage });
    }
  }

  @httpDelete("/deleteEvent/:id", RoleMiddleware(["admin"]))
  async deleteevent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.eventService.deleteEvent(id);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.EVENTDELETED });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getAllEvent", RoleMiddleware(["admin", "user"]))
  async getAllevent(req: Request, res: Response) {
    try {
      const data = await this.eventService.getAllEvent();
      return res
        .status(statusCode.Created)
        .json({ status: true, data: data });
    } catch (error: any) {
        const errorMessage = errorHandler(error);
        return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getEventById/:id", RoleMiddleware(["admin", "user"]))
  async geteventById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.eventService.geteventById(id);
      return res
        .status(statusCode.Created)
        .json({ status: true, data: data });
    } catch (error: any) {
       const errorMessage = errorHandler(error);
       return res.json({ status: false, ...errorMessage });
    }
  }
}