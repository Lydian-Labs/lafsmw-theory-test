import { getTransporter } from "./nodemailer";

export const sendEmailNodemailer = async (
  email: string,
  subject: string,
  text: string
) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: email,
    subject,
    text,
  });
};
