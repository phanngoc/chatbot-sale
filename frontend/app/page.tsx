import WidgetButton from '@components/WidgetButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Chào mừng đến với Trang Demo Chatbot</h1>
      <div className="max-w-4xl text-center mb-12">
        <p className="text-xl mb-4">
          Đây là bản demo cho widget chat tương tác với khách hàng trực tiếp trên 
          website thương mại điện tử.
        </p>
        <p className="text-lg mb-8">
          Dễ dàng tích hợp và tùy chỉnh cho website của bạn.
        </p>
      </div>
      
      {/* Widget chat sẽ nằm ở góc phải dưới màn hình */}
      <WidgetButton />
    </main>
  )
} 