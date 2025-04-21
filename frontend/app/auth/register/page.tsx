"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      setIsLoading(false);
      return;
    }

    try {
      // Thông thường bạn sẽ call API đăng ký ở đây
      // Vì đây là demo nên chúng ta sẽ chuyển hướng đến trang đăng nhập
      setIsLoading(false);
      router.push("/auth/login?registered=true");
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng ký");
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="relative block w-full rounded-t-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="Họ và tên"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="Mật khẩu"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="relative block w-full rounded-b-md border-0 p-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="Xác nhận mật khẩu"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md bg-primary-600 px-3 py-3 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-gray-300"
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </div>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </>
  );
} 