"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Thông tin tài khoản
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Chi tiết thông tin cá nhân và tài khoản.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {session?.user?.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {session?.user?.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                User Token
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {session?.user?.token}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Script mẫu
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Hãy sao chép đoạn mã dưới đây và dán vào website của bạn.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <code>
              {`<script src="https://example.com/client.js" data-user="${session?.user?.token}"></script>`}
            </code>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `<script src="https://example.com/client.js" data-user="${session?.user?.token}"></script>`
                );
                alert("Đã sao chép vào clipboard!");
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sao chép mã
            </button>
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/scripts"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Xem hướng dẫn chi tiết cách tích hợp &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Thống kê
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Số liệu thống kê về tương tác với khách hàng
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Tổng số cuộc hội thoại
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
              </div>
            </div>
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Khách hàng mới trong 7 ngày
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
              </div>
            </div>
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Tỉ lệ hài lòng
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  --
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 