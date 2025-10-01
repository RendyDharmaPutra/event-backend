import { Request, Response } from "express";
import { authService, AuthService } from "./authentication.service";
import { AuthRequest } from "../../types/common";
import { responseUtils } from "../../utils/response";

export class AuthController {
  constructor(private authService: AuthService) {}

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const result = await this.authService.updateProfile(
        req.user!.id!.toString(),
        req.body.fullName,
        req.body.profilePicture
      );
      if (!result) return responseUtils.sendNotFound(res, "user not found");
      responseUtils.sendSuccess(res, result, "profile updated");
    } catch (err) {
      responseUtils.sendError(res, err, "failed to update profile");
    }
  }

  async updatePassword(req: AuthRequest, res: Response) {
    try {
      const result = await this.authService.updatePassword(
        req.user!.id!.toString(),
        req.body.oldPassword,
        req.body.password
      );
      if (!result)
        return responseUtils.sendNotFound(res, "invalid old password");
      responseUtils.sendSuccess(res, result, "password updated");
    } catch (err) {
      responseUtils.sendError(res, err, "failed to update password");
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = req.body;

      const result = await this.authService.register(
        user.fullName,
        user.username,
        user.email,
        user.password
      );
      responseUtils.sendSuccess(res, result, "success registration!");
    } catch (err) {
      responseUtils.sendError(res, err, "failed registration");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.authService.login(
        req.body.identifier,
        req.body.password
      );
      if (!token)
        return responseUtils.sendUnauthorized(res, "invalid credentials");
      responseUtils.sendSuccess(res, token, "login success");
    } catch (err) {
      responseUtils.sendError(res, err, "login failed");
    }
  }

  async me(req: AuthRequest, res: Response) {
    try {
      const result = await this.authService.getProfile(
        req.user!.id!.toString()
      );
      responseUtils.sendSuccess(res, result, "success get user profile");
    } catch (err) {
      responseUtils.sendError(res, err, "failed get user profile");
    }
  }

  async activation(req: Request, res: Response) {
    try {
      const result = await this.authService.activateUser(req.body.code);
      responseUtils.sendSuccess(res, result, "user activated");
    } catch (err) {
      responseUtils.sendError(res, err, "activation failed");
    }
  }
}

export const authController = new AuthController(authService);
