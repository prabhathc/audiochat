import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  console.log('Request nextUrl:', req.nextUrl.href);

  if (req.method === "GET" && req.nextUrl.pathname === "/auth/logout") {
    console.log("Middleware: /auth/logout route accessed");
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('Middleware Session check: ', session != null);

  if (!session) {
    return NextResponse.rewrite(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/logout).*)',
  ],
}
