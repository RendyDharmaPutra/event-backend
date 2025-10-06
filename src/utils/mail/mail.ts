import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { env } from "../../config/env";

const transporter = nodemailer.createTransport({
  // service: env.EMAIL_SMTP_SERVICE_NAME,
  host: env.EMAIL_SMTP_HOST,
  port: env.EMAIL_SMTP_PORT,
  secure: env.EMAIL_SMTP_SECURE,
  auth: {
    user: env.EMAIL_SMTP_USER,
    pass: env.EMAIL_SMTP_PASS,
  },
  requireTLS: true,
});

export interface MailParams {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ ...mailParams }: MailParams) => {
  const result = await transporter.sendMail({
    ...mailParams,
  });
  return result;
};

export const renderMailTemplate = async (
  template: string,
  data: any
): Promise<string> => {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    data
  );
  return content as string;
};
