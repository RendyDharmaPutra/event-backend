import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/common";
import { responseUtils } from "../utils/response";

export default (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return responseUtils.sendUnauthorized(res, "forbidden");
    }
    next();
  };
};
