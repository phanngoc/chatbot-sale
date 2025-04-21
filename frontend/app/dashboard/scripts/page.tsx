"use client";

import { useSession } from "next-auth/react";

export default function ScriptsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Hướng dẫn tích hợp script
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Thực hiện các bước dưới đây để tích hợp chatbot vào website của bạn.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="prose max-w-none">
            <h4>Bước 1: Sao chép mã script</h4>
            <p>
              Sao chép đoạn mã dưới đây. Đây là đoạn mã duy nhất bạn cần để nhúng
              chatbot vào website của mình.
            </p>

            <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto mt-4 mb-4">
              <code>
                {`<script src="https://example.com/client.js" data-user="${session?.user?.token}"></script>`}
              </code>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `<script src="https://example.com/client.js" data-user="${session?.user?.token}"></script>`
                );
                alert("Đã sao chép vào clipboard!");
              }}
              className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sao chép mã
            </button>

            <h4>Bước 2: Dán vào website của bạn</h4>
            <p>
              Dán đoạn mã vào phần cuối thẻ <code>&lt;body&gt;</code> trong mã
              HTML của website bạn. Nếu bạn sử dụng các nền tảng phổ biến, hãy
              làm theo hướng dẫn dưới đây:
            </p>

            <h5>WordPress</h5>
            <ol>
              <li>
                Đăng nhập vào trang quản trị WordPress của bạn.
              </li>
              <li>
                Vào mục <strong>Appearance (Giao diện) &gt; Theme Editor (Sửa giao diện)</strong>.
              </li>
              <li>
                Tìm file <code>footer.php</code> trong danh sách file.
              </li>
              <li>
                Dán đoạn mã trên vào trước thẻ đóng <code>&lt;/body&gt;</code>.
              </li>
              <li>
                Nhấn <strong>Update File (Cập nhật File)</strong>.
              </li>
            </ol>

            <h5>Shopify</h5>
            <ol>
              <li>
                Đăng nhập vào Shopify Admin.
              </li>
              <li>
                Vào mục <strong>Online Store &gt; Themes (Giao diện)</strong>.
              </li>
              <li>
                Tìm theme đang hoạt động và nhấn <strong>Actions &gt; Edit code (Sửa mã)</strong>.
              </li>
              <li>
                Mở file <code>theme.liquid</code>.
              </li>
              <li>
                Dán đoạn mã vào trước thẻ đóng <code>&lt;/body&gt;</code>.
              </li>
              <li>
                Nhấn <strong>Save (Lưu)</strong>.
              </li>
            </ol>

            <h5>Wix, Squarespace và các nền tảng khác</h5>
            <ol>
              <li>
                Đăng nhập vào tài khoản của bạn.
              </li>
              <li>
                Tìm phần tùy chỉnh theme hoặc tùy chỉnh HTML/CSS.
              </li>
              <li>
                Tìm phần cho phép chèn mã tùy chỉnh hoặc chỉnh sửa footer.
              </li>
              <li>
                Dán đoạn mã vào và lưu lại.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Tùy chỉnh
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Các tùy chọn để thay đổi giao diện và hành vi của chatbot.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <p className="text-sm text-gray-500 mb-4">
            Bạn có thể thêm các thuộc tính tùy chọn vào thẻ script để thay đổi
            giao diện chatbot:
          </p>

          <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <code>{`<script 
  src="https://example.com/client.js" 
  data-user="${session?.user?.token}"
  data-position="right" 
  data-primary-color="#4f46e5"
  data-welcome-message="Xin chào! Tôi có thể giúp gì cho bạn?"
></script>`}</code>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">
              Các thuộc tính có thể tùy chỉnh:
            </h4>
            <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside pl-4">
              <li>
                <code>data-position</code>: Vị trí hiển thị (
                <code>right</code>, <code>left</code>)
              </li>
              <li>
                <code>data-primary-color</code>: Màu sắc chính của chatbot
              </li>
              <li>
                <code>data-welcome-message</code>: Tin nhắn chào mừng khi mở
                chatbot
              </li>
              <li>
                <code>data-auto-open</code>: Tự động mở chatbot sau vài giây (
                <code>true</code>, <code>false</code>)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 