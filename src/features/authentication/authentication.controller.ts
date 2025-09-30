import { Request, Response } from "express";
import { responseUtils } from "../../utils/response";
import { authService, AuthService } from "./authentication.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const result = await this.authService.login();

    return responseUtils.sendSuccess(res, result, "Login successfully");
  }

  async register(req: Request, res: Response) {
    const result = await this.authService.register();

    return responseUtils.sendSuccess(res, result, "Register successfully");
  }
}

export const authController = new AuthController(authService);
