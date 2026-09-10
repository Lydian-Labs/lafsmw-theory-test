import { getEmailCredentials, getTransporter } from "./nodemailer";

// Recipients are decided here on the server, never by the client.
// The camp director is only included when EMAIL_CAMP_DIRECTOR is set.
export const getResultsRecipients = (): string[] => {
  const recipients = [
    process.env.EMAIL_DEVELOPER,
    process.env.EMAIL_CAMP_DIRECTOR,
  ].filter((address): address is string => Boolean(address?.trim()));
  if (recipients.length === 0) {
    throw new Error(
      "Email is not configured: set EMAIL_DEVELOPER and/or EMAIL_CAMP_DIRECTOR on the server.",
    );
  }
  return recipients;
};

export const sendEmailNodemailer = async (subject: string, html: string) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: getEmailCredentials().user,
    to: getResultsRecipients(),
    subject,
    html,
  });
};
