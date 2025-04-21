import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chatbot Bán Hàng',
  description: 'Hệ thống chatbot tích hợp AI cho website thương mại điện tử',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="font-sans">
        <header className="bg-primary-500 text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Chatbot Bán Hàng</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-primary-100">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-primary-100">
                    Demo Sản Phẩm
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p>© 2023 Chatbot Bán Hàng. Đây là ứng dụng demo.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 