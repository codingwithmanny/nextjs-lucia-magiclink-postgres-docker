// Imports
// =================================
import nodemailer from "nodemailer";
import { env } from "@/env";

// Scripts
// =================================
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_SERVER_HOST,
    port: parseInt(env.EMAIL_SERVER_PORT, 0),
    secure: env.EMAIL_SERVER_SECURE === "true",
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  transporter.close();
};
