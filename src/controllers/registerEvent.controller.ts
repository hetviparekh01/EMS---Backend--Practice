import { inject } from "inversify";
import { message, statusCode, TYPES } from "../constants";
import { RegisterEventService } from "../services";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { RoleMiddleware } from "../middlewares";
import { Request, Response } from "express";
import { errorHandler } from "../utils";

@controller("/register", TYPES.AuthMiddleware)
export class RegisterEventController {
  constructor(
    @inject<Event>(TYPES.RegisterEventService)
    private registerEventService: RegisterEventService
  ) {}

  @httpPost("/registerEvent", RoleMiddleware(["admin", "user"]))
  async registerEvent(req: Request, res: Response) {
    try {
      const registerEventData = req.body;
      registerEventData.userId = req.headers._id;
      const data = await this.registerEventService.registerEvent(
        registerEventData
      );
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.EVENTREGISTERED, data: data });
    } catch (error: any) {
     const errorMessage = errorHandler(error);
     return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getAllRegisteredEvent", RoleMiddleware(["admin"]))
  async getAllRegisteredEvent(req: Request, res: Response) {
    try {
      const data = await this.registerEventService.getAllRegisteredEvent();
      return res.status(statusCode.Created).json({ status: true, data: data });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getRegisterEventById/:id", RoleMiddleware(["admin", "user"]))
  async deleteevent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.registerEventService.getRegisterEventById(id);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.EVENTDELETED });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getAllRegisteredEventForUser", RoleMiddleware(["admin", "user"]))
  async getAllRegisteredEventForUser(req: Request, res: Response) {
    try {
      const id = req.headers._id as string;
      const data=await this.registerEventService.getAllRegisteredEventForUser(id);
      return res
        .status(statusCode.Created)
        .json({ status: true, data:data });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }
}
