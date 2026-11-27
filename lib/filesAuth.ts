import crypto from "node:crypto";
import { NextRequest } from "next/server";

export const FS_AUTH_COOKIE = "fs_auth";
export const FS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getConfiguredPassword(): string | null {
  const pwd = process.env.FILESERVER_PASSWORD?.trim();
  return pwd && pwd.length > 0 ? pwd : null;
}

export function computeSessionToken(password: string): string {
  return crypto
    .createHmac("sha256", `roman-portfolio-fs:${password}`)
    .update("fileserver-authenticated-session-v1")
    .digest("hex");
}

export function safeCompareStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export function isFilesAuthorized(req: NextRequest): boolean {
  const configured = getConfiguredPassword();
  if (!configured) return false;

  const cookieVal = req.cookies.get(FS_AUTH_COOKIE)?.value;
  if (!cookieVal) return false;

  const expected = computeSessionToken(configured);
  return safeCompareStrings(cookieVal, expected);
}
