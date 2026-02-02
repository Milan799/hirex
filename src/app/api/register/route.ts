import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User, type UserRole } from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json().catch(() => ({}));
    const { fullName, email, password, role } = body as {
      fullName?: string;
      email?: string;
      password?: string;
      role?: UserRole;
    };

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Full name, email and password are required" },
        { status: 400 }
      );
    }

    const normalizedRole: UserRole =
      role === "recruiter" || role === "candidate" ? role : "candidate";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: normalizedRole,
    });

    const safeUser = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json(
      {
        message: "Registration successful",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
