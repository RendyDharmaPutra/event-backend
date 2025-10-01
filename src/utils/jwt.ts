import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserTokenPayload } from "../types/common";

export const generateToken = (user: UserTokenPayload): string => {
  const token = jwt.sign(user, env.SECRET, {
    expiresIn: "1h",
  });
  return token;
};
export const getUserData = (token: string) => {
  const user = jwt.verify(token, env.SECRET) as UserTokenPayload;
  return user;
};
