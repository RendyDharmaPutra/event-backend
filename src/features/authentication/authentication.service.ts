import { UserModel } from "../../models/user.model";
import { hashPwd } from "../../utils/hash_pwd";
import { generateToken } from "../../utils/jwt";
import { Types } from "mongoose";

export class AuthService {
  async updateProfile(
    userId: Types.ObjectId,
    fullName: string,
    profilePicture: string
  ) {
    return UserModel.findByIdAndUpdate(
      userId,
      { fullName, profilePicture },
      { new: true }
    );
  }

  async updatePassword(
    userId: Types.ObjectId,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await UserModel.findById(userId);
    if (!user || user.password !== hashPwd(oldPassword)) return null;

    return UserModel.findByIdAndUpdate(
      userId,
      { password: hashPwd(newPassword) },
      { new: true }
    );
  }

  async register(
    fullName: string,
    username: string,
    email: string,
    password: string
  ) {
    return await UserModel.create({ fullName, username, email, password });
  }

  async login(identifier: string, password: string) {
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      isActive: true,
    });

    if (!user) return null;
    if (hashPwd(password) !== user.password) return null;

    return generateToken({ id: user._id, role: user.role });
  }

  async getProfile(userId: Types.ObjectId) {
    return UserModel.findById(userId);
  }

  async activateUser(code: string) {
    return UserModel.findOneAndUpdate(
      { activationCode: code },
      { isActive: true },
      { new: true }
    );
  }
}

export const authService = new AuthService();
