import crypto from "crypto";
import { env } from "../config/env";

export const hashPwd = (password: string): string => {
  return crypto
    .pbkdf2Sync(password, env.SECRET, 1000, 64, "sha512")
    .toString("hex");
};
