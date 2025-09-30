import dotenv from "dotenv";

dotenv.config();

const getEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
};

export const env = {
  BACKEND_PORT: getEnvVar("BACKEND_PORT"),
  SECRET: getEnvVar("SECRET"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),

  EMAIL_SMTP_SECURE: getEnvVar("EMAIL_SMTP_SECURE"),
  EMAIL_SMTP_PASS: getEnvVar("EMAIL_SMTP_PASS"),
  EMAIL_SMTP_USER: getEnvVar("EMAIL_SMTP_USER"),
  EMAIL_SMTP_PORT: getEnvVar("EMAIL_SMTP_PORT"),
  EMAIL_SMTP_HOST: getEnvVar("EMAIL_SMTP_HOST"),
  EMAIL_SMTP_SERVICE_NAME: getEnvVar("EMAIL_SMTP_SERVICE_NAME"),

  SENDGRID_API_KEY: getEnvVar("SENDGRID_API_KEY"),

  MIDTRANS_CLIENT_KEY: getEnvVar("MIDTRANS_CLIENT_KEY"),
  MIDTRANS_SERVER_KEY: getEnvVar("MIDTRANS_SERVER_KEY"),
  MIDTRANS_TRANSACTION_URL: getEnvVar("MIDTRANS_TRANSACTION_URL"),

  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnvVar("CLOUDINARY_API_SECRET"),

  CLIENT_HOST: getEnvVar("CLIENT_HOST"),
};
