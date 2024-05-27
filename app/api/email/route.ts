import { NextRequest, NextResponse } from "next/server";
import { sendEmailNodemailer } from "@/backend/sendEmailNodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, subject, text } = await request.json();

    await sendEmailNodemailer(email, subject, text);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error sending email", details: (error as Error).message },
      { status: 500 }
    );
  }
}
