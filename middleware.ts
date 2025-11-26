import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Se l'utente cerca di andare su /admin...
  if (request.nextUrl.pathname.startsWith("/admin")) {
    
    // ...ma non è la pagina di login...
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // ...controlliamo se ha il "biscottino" (cookie) di accesso
    const authCookie = request.cookies.get("admin_session");

    // Se non ce l'ha, calcio nel sedere verso il login
    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
