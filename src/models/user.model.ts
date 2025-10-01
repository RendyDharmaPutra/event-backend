import mongoose, { Schema } from "mongoose";
import { ROLES } from "../constants/roles";
import { hashPwd } from "../utils/hash_pwd";
import { env } from "../config/env";
import { renderMailTemplate, sendMail } from "../utils/mail/mail";

export const USER_MODEL_NAME = "User";

export interface UserType {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
}

const UserSchema = new Schema<UserType>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.MEMBER, ROLES.MANAGER],
      default: ROLES.MEMBER,
    },
    profilePicture: { type: String, default: "user.jpg" },
    isActive: { type: Boolean, default: false },
    activationCode: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.password = hashPwd(this.password);
  this.activationCode = hashPwd(this.id);
  next();
});

UserSchema.post("save", async function (doc, next) {
  try {
    const contentMail = await renderMailTemplate("registration-success.ejs", {
      username: doc.username,
      fullName: doc.fullName,
      email: doc.email,
      createdAt: doc.createdAt,
      activationLink: `${env.CLIENT_HOST}/auth/activation?code=${doc.activationCode}`,
    });
    await sendMail({
      from: env.EMAIL_SMTP_USER,
      to: doc.email,
      subject: "Account Activation",
      html: contentMail,
    });
  } catch (err) {
    console.error(err);
  } finally {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.activationCode;
  return user;
};

export const UserModel = mongoose.model(USER_MODEL_NAME, UserSchema);
