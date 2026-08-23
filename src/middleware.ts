import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const { jwtVerify } = await import("jose");
      // Matches getSecret() in lib/auth.ts — no public fallback in production,
      // so an unset JWT_SECRET fails the verify and redirects to login.
      const configured = process.env.JWT_SECRET;
      if (!configured && process.env.NODE_ENV === "production") {
        throw new Error("JWT_SECRET is not set");
      }
      const secret = new TextEncoder().encode(
        configured || "development-only-secret-do-not-use-in-production"
      );
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.set("admin-token", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|ar)/:path*", "/admin", "/admin/:path*"],
};
