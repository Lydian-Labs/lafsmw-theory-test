import { createTransport } from "nodemailer";

// Server-only credentials. These must NOT use the NEXT_PUBLIC_ prefix or they
// would be inlined into the client bundle.
export const getEmailCredentials = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    throw new Error(
      "Email is not configured: EMAIL_USER and EMAIL_PASS must be set on the server.",
    );
  }
  return { user, pass };
};

export const getTransporter = () => {
  return createTransport({
    service: "gmail",
    auth: getEmailCredentials(),
  });
};
