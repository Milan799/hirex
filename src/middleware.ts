import { NextResponse } from "next/server";

export function middleware(request:any) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/admin",
    "/settings",
  ];

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = pathname.startsWith("/auth/login");

  // ❌ If trying to access protected route without token → go to login
  if (isProtectedRoute && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // ✅ NEW RULE:
  // If user is already logged in and tries to visit login page → send to dashboard
  if (isAuthRoute && accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/auth/login",
  ],
};
