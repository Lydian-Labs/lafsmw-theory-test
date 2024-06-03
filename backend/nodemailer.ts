import { createTransport } from "nodemailer";

export const getTransporter = () => {
  return createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
};
