import { NextFunction, Request, Response } from "express";
import { getUserData } from "../utils/jwt";
import { AuthRequest } from "../types/common";
import { responseUtils } from "../utils/response";

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return responseUtils.sendUnauthorized(res);
  }

  const [prefix, token] = authorization.split(" ");

  if (!(prefix === "Bearer" && token)) {
    return responseUtils.sendUnauthorized(res);
  }

  const user = getUserData(token);

  if (!user) {
    return responseUtils.sendUnauthorized(res);
  }

  (req as AuthRequest).user = user;

  next();
};
