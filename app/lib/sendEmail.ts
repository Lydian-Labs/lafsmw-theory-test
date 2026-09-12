import { EmailData } from "./types";

// Posts the results email to our API route. Recipients are decided server-side.
export async function sendEmail(data: EmailData) {
  return fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
