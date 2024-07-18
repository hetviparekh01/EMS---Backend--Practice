import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { AuthService } from "../services";
import { message, statusCode, TYPES } from "../constants";
import { errorHandler } from "../utils";
import { multerErrorHandling, upload } from "../middlewares";
import { Request,Response } from "express";
@controller("/auth")
export class AuthController {
  constructor(
    @inject<AuthService>(TYPES.AuthService) private authService: AuthService
  ) {}
  @httpPost("/signup", upload.single("profileImage"), multerErrorHandling)
  async signup(req: Request, res: Response) {
    try {
      const userData = req.body;
      userData.profileImage = req.file?.filename;
      await this.authService.signup(userData);
      return res.json({ status: true, message: message.USERSIGNEDUP });
    } catch (error: any) {
          const errorMessage = errorHandler(error);
          res.json({ status: false, message:errorMessage });
    }
  }
  
  @httpPost("/login")
  async login(req: Request, res: Response) {
    try {
      const userData = req.body;
      const data=await this.authService.login(userData);
      return res
        .json({ status: true, message: message.USERLOGGEDIN, data: data });
    } catch (error: any) {
         const errorMessage = errorHandler(error);
        res.json({ status: false, message:errorMessage });
    }
  }
}