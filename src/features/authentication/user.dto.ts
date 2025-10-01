import * as Yup from "yup";

export const passwordSchema = Yup.string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/\d/, "Must contain at least one number");

export const confirmPasswordSchema = Yup.string()
  .required("Confirm password is required")
  .oneOf([Yup.ref("password")], "Passwords must match");

export const userLoginDTO = Yup.object({
  identifier: Yup.string().required("Identifier is required"),
  password: Yup.string().required("Password is required"),
});

export const userUpdatePasswordDTO = Yup.object({
  oldPassword: passwordSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export const userRegisterDTO = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export type TUserRegister = Yup.InferType<typeof userRegisterDTO>;
