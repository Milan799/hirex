import { NextResponse } from "next/server";

// TODO: Add real OTP generation and email sending
// For now returns success so the forgot-password form works without an external backend
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Placeholder: send OTP to email
    // await sendOtpEmail(email);

    return NextResponse.json({
      message: "OTP sent to your email",
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
