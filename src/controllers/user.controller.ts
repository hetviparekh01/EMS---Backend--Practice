import {
  controller,
  httpDelete,
  httpGet,
  httpPut,
} from "inversify-express-utils";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { multerErrorHandling, RoleMiddleware, upload } from "../middlewares";
import { UserService } from "../services";
import { inject } from "inversify";
import { message, statusCode, TYPES } from "../constants";
import { errorHandler } from "../utils";
@controller("/user", TYPES.AuthMiddleware)
export class UserController {
  constructor(
    @inject<UserService>(TYPES.UserService) private userService: UserService
  ) { }

  @httpPut(
    "/updateUser/:id",
    RoleMiddleware(["admin"]),
    upload.single("profileImage"),
    multerErrorHandling
  )
  async updateUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const { id } = req.params;
      if (userData.password) {
        let hashedpsswd = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedpsswd;
      }
      if (req.file) {
        userData.profileImage = req.file.filename;
      }
      await this.userService.updateUser(id, userData);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.USERUPDATED });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return { status: false, ...errorMessage };
    }
  }

  @httpPut(
    "/updateParticularUser/",
    RoleMiddleware(["admin", "user"]),
    upload.single("profileImage"),
    multerErrorHandling
  )
  async updateParticularUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const { userName, email, password, role } = req.body;
      const id = req.headers._id as string;
      if (userData.password) {
        let hashedpsswd = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedpsswd;
      }
      if (req.file) {
        userData.profileImage = req.file.filename;
      }
      await this.userService.updateUser(id, userData);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.USERUPDATED });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return { status: false, ...errorMessage };
    }
  }

  @httpDelete("/deleteUser/:id", RoleMiddleware(["admin"]))
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.USERDELETED });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return { status: false, ...errorMessage };
    }
  }

  @httpDelete("/deleteParticularUser", RoleMiddleware(["admin", "user"]))
  async deleteParticularUser(req: Request, res: Response) {
    try {
      const id = req.headers._id as string;
      await this.userService.deleteUser(id);
      return res
        .status(statusCode.Created)
        .json({ status: true, message: message.USERDELETED });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getAllUser", RoleMiddleware(["admin"]))
  async getAllUser(req: Request, res: Response) {
    try {
      const data = await this.userService.getAllUser();
      return res.status(statusCode.Created).json({ status: true, data: data });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }

  @httpGet("/getUserById", RoleMiddleware(["admin", "user"]))
  async getUserById(req: Request, res: Response) {
    try {
      const id = req.headers._id as string;
      const data = await this.userService.getUserById(id);
      return res.status(statusCode.Created).json({ status: true, data: data });
    } catch (error: any) {
      const errorMessage = errorHandler(error);
      return res.json({ status: false, ...errorMessage });
    }
  }
}
