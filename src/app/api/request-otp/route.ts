import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";
import { sendOtpEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // Always respond generically to avoid user enumeration
    if (!user) {
      return NextResponse.json({
        message: "If this email exists, an OTP has been sent",
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = code;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendOtpEmail({ to: user.email, code });
    } catch (error) {
      console.error("Failed to send OTP email:", error);
      return NextResponse.json(
        {
          message:
            "Could not send OTP email. Please check email configuration or contact support.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "If this email exists, an OTP has been sent",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
