// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const langCookie = req.cookies.get("lang")?.value;

  // If no lang cookie, set default to 'en'
  if (!langCookie) {
    const res = NextResponse.next();
    res.cookies.set("lang", "en", { path: "/" });
    return res;
  }

  return NextResponse.next();
}
