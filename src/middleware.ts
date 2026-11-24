import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

function detect(req: NextRequest): Locale {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookie)) return cookie;
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.startsWith("ru") || /(^|,)\s*ru/.test(al) && !al.startsWith("uz")) return "ru";
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/${detect(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|icon.svg|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
