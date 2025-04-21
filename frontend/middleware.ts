import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kiểm tra nếu pathname bắt đầu với /dashboard
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || "supersecret",
    });

    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các route này
export const config = {
  matcher: ["/dashboard/:path*"],
};