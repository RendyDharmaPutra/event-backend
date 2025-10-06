import { Request } from "express";
import { Types } from "mongoose";
import { UserType } from "../models/user.model";

/**
 * Payload user yang disimpan di token (misalnya JWT).
 * Beberapa field sensitif dihilangkan.
 */
export interface UserTokenPayload
  extends Omit<
    UserType,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

/**
 * Request Express yang sudah di-inject user.
 * Digunakan pada middleware auth.
 */
export interface AuthRequest extends Request {
  user?: UserTokenPayload;
}

/**
 * Query standar untuk pagination (misalnya di ?page=1&limit=10&search=...).
 */
export interface PaginationQuery {
  page: number;
  limit: number;
  search?: string;
}
