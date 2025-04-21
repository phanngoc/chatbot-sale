"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    // Giả lập API call
    setTimeout(() => {
      setSuccessMessage("Cài đặt đã được lưu thành công!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Cài đặt tài khoản
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Thay đổi cài đặt tài khoản và chatbot của bạn.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên hiển thị
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={session?.user?.name || ""}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  disabled
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border bg-gray-50"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Email không thể thay đổi.
              </p>
            </div>

            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu hiện tại
              </label>
              <div className="mt-1">
                <input
                  id="current-password"
                  name="currentPassword"
                  type="password"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <div className="mt-1">
                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu mới
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                {successMessage && (
                  <p className="text-green-600 mr-4 self-center">
                    {successMessage}
                  </p>
                )}
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300"
                >
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Cài đặt chatbot
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Tùy chỉnh giao diện và chức năng của chatbot.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="welcome-message"
                className="block text-sm font-medium text-gray-700"
              >
                Tin nhắn chào mừng
              </label>
              <div className="mt-1">
                <textarea
                  id="welcome-message"
                  name="welcomeMessage"
                  rows={3}
                  defaultValue="Xin chào! Tôi có thể giúp gì cho bạn?"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="primary-color"
                className="block text-sm font-medium text-gray-700"
              >
                Màu chính
              </label>
              <div className="mt-1">
                <input
                  id="primary-color"
                  name="primaryColor"
                  type="color"
                  defaultValue="#4f46e5"
                  className="block rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm h-10 w-20 p-1 border"
                />
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="auto-open"
                  name="autoOpen"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="auto-open"
                  className="font-medium text-gray-700"
                >
                  Tự động mở chatbot
                </label>
                <p className="text-gray-500">
                  Chatbot sẽ tự động mở sau vài giây khi người dùng truy cập website.
                </p>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Khôi phục mặc định
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Lưu thiết lập
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 