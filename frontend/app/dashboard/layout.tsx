"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium">Đang tải...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow overflow-y-auto bg-primary-700 pt-5">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          </div>
          <div className="mt-5 flex flex-col flex-1">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              <a
                href="/dashboard"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-primary-800"
              >
                Bảng điều khiển
              </a>
              <a
                href="/dashboard/scripts"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-primary-100 hover:bg-primary-600"
              >
                Mã script
              </a>
              <a
                href="/dashboard/settings"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-primary-100 hover:bg-primary-600"
              >
                Cài đặt
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <header className="bg-white shadow">
          <div className="px-4 py-4 sm:px-6 md:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">
                {session?.user?.name || "Người dùng"}
              </span>
              <a
                href="/api/auth/signout"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
} 