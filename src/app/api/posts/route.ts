import { NextResponse } from "next/server";

const MOCK_POSTS = [
  { id: "1", title: "Welcome to HireX", body: "Your job hunting platform." },
  { id: "2", title: "Get Started", body: "Create an account and browse jobs." },
];

export async function GET() {
  return NextResponse.json(MOCK_POSTS);
}
