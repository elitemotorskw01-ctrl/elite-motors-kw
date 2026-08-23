import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Never fall back to a hardcoded secret: this file is public, so a default
// would let anyone forge an admin session. Development gets a throwaway
// value; production must supply its own.
function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "JWT_SECRET is not set. Refusing to sign admin tokens with a default secret."
    );
  }

  return "development-only-secret-do-not-use-in-production";
}

const JWT_SECRET = new TextEncoder().encode(getSecret());

const COOKIE_NAME = "admin-token";

export async function createToken(adminId: string, username: string) {
  return new SignJWT({ adminId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { adminId: string; username: string };
  } catch {
    return null;
  }
}

export async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getAdminFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
