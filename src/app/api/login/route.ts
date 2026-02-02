import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User, type UserRole } from "@/lib/models/User";

// Credentials login - validates email/password and returns session-like user object
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json().catch(() => ({}));
    const { email, password, role } = body as {
      email?: string;
      password?: string;
      role?: UserRole;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordValid = await user.comparePassword(password);

    if (!passwordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If a role is provided from the UI, make sure it matches the stored role
    if (role && role !== user.role) {
      return NextResponse.json(
        {
          message: `This account is registered as "${user.role}". Please select the correct option.`,
        },
        { status: 403 }
      );
    }

    const safeUser = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
