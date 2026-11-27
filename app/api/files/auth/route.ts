import { NextRequest, NextResponse } from "next/server";
import {
  FS_AUTH_COOKIE,
  FS_COOKIE_MAX_AGE,
  computeSessionToken,
  getConfiguredPassword,
  isFilesAuthorized,
  safeCompareStrings,
} from "@/lib/filesAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const configured = getConfiguredPassword() !== null;
  const authenticated = isFilesAuthorized(req);
  return NextResponse.json({ authenticated, configured });
}

export async function POST(req: NextRequest) {
  try {
    const configured = getConfiguredPassword();
    if (!configured) {
      return NextResponse.json(
        { error: "Пароль сервера (FILESERVER_PASSWORD) не налаштовано в .env.local." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const password = typeof body?.password === "string" ? body.password : "";

    if (!password || !safeCompareStrings(password, configured)) {
      return NextResponse.json({ error: "Невірний пароль." }, { status: 401 });
    }

    const token = computeSessionToken(configured);
    const res = NextResponse.json({ authenticated: true });
    res.cookies.set({
      name: FS_AUTH_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: FS_COOKIE_MAX_AGE,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Помилка авторизації." }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ authenticated: false });
  res.cookies.set({
    name: FS_AUTH_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
