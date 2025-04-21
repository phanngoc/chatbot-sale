"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Đã xảy ra lỗi trong quá trình xác thực";

  if (error === "CredentialsSignin") {
    errorMessage = "Email hoặc mật khẩu không chính xác";
  } else if (error === "AccessDenied") {
    errorMessage = "Bạn không có quyền truy cập trang này";
  } else if (error === "SessionRequired") {
    errorMessage = "Vui lòng đăng nhập để tiếp tục";
  }

  return (
    <div className="text-center">
      <div className="text-red-500 mb-4">
        <h3 className="text-xl font-medium mb-2">Lỗi xác thực</h3>
        <p>{errorMessage}</p>
      </div>
      <Link
        href="/auth/login"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Quay lại trang đăng nhập
      </Link>
    </div>
  );
} 