import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      otp?: string;
      password?: string;
    };

    const { email, otp, password } = body;

    if (!email || !otp || !password) {
      return NextResponse.json(
        { message: "Email, OTP and new password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password resetOtp resetOtpExpires");

    if (!user || !user.resetOtp || !user.resetOtpExpires) {
      return NextResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 }
      );
    }

    const now = new Date();

    if (user.resetOtp !== otp || user.resetOtpExpires < now) {
      return NextResponse.json(
        { message: "Invalid or expired code" },
        { status: 400 }
      );
    }

    // Set new password – pre-save hook will hash it
    user.password = password;
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password has been reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    );
  }
}

