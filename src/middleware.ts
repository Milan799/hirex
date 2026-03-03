import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function middleware(request: any) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/mnjuser/homepage",
    "/profile",
    "/admin",
    "/settings",
    "/employer",
  ];

  const session = await auth();

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = pathname.startsWith("/auth/login");

  // ❌ If trying to access protected route without token → go to login
  if (isProtectedRoute && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If user is already logged in and tries to visit login page → send to their exact dashboard
  if (isAuthRoute && session) {
    const userRole = session.user?.role;
    const url = request.nextUrl.clone();
    
    if (userRole === "recruiter") {
      url.pathname = "/employer/dashboard";
    } else {
      url.pathname = "/mnjuser/homepage";
    }
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mnjuser/homepage/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/employer/:path*",
    "/auth/login",
  ],
};
