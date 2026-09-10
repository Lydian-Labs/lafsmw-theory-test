import { NextRequest, NextResponse } from "next/server";
import { sendEmailNodemailer } from "@/backend/sendEmailNodemailer";

const MAX_SUBJECT_LENGTH = 200;
const MAX_HTML_LENGTH = 200_000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { subject, html } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof subject !== "string" ||
    typeof html !== "string" ||
    !subject.trim() ||
    !html.trim() ||
    subject.length > MAX_SUBJECT_LENGTH ||
    html.length > MAX_HTML_LENGTH
  ) {
    return NextResponse.json(
      { error: "Request must include a non-empty 'subject' and 'html'" },
      { status: 400 },
    );
  }

  try {
    await sendEmailNodemailer(subject, html);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error sending email", details: (error as Error).message },
      { status: 500 },
    );
  }
}
