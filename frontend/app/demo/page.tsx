'use client'

import { useState } from 'react'
import WidgetButton from '@components/WidgetButton'

// Dữ liệu sản phẩm giả lập
const demoProducts = [
  {
    id: '1',
    name: 'Điện thoại thông minh XYZ',
    price: 12000000,
    description: 'Điện thoại cao cấp với camera 108MP, chip mới nhất và màn hình AMOLED 6.7 inch.',
    imageUrl: 'https://via.placeholder.com/400x400.png?text=Điện+thoại+XYZ',
    category: 'Điện thoại'
  },
  {
    id: '2',
    name: 'Laptop ABC Pro',
    price: 25000000,
    description: 'Laptop mỏng nhẹ, hiệu năng cao, thích hợp cho công việc và giải trí.',
    imageUrl: 'https://via.placeholder.com/400x400.png?text=Laptop+ABC+Pro',
    category: 'Laptop'
  },
  {
    id: '3',
    name: 'Tai nghe không dây UltraSound',
    price: 3500000,
    description: 'Tai nghe với công nghệ chống ồn chủ động, âm thanh sống động.',
    imageUrl: 'https://via.placeholder.com/400x400.png?text=Tai+nghe+UltraSound',
    category: 'Phụ kiện'
  }
]

export default function DemoPage() {
  const [selectedProduct, setSelectedProduct] = useState(demoProducts[0])
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Trang Demo Sản Phẩm</h1>
      
      {/* Phần sản phẩm hiện tại */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img 
              src={selectedProduct.imageUrl} 
              alt={selectedProduct.name} 
              className="max-w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
            <p className="text-primary-700 text-xl mb-4">{selectedProduct.price.toLocaleString('vi-VN')} đ</p>
            <div className="mb-4">
              <p className="text-gray-700">{selectedProduct.description}</p>
            </div>
            <button 
              onClick={() => addToCart(selectedProduct)}
              className="bg-primary-500 text-white py-2 px-6 rounded-lg hover:bg-primary-600 transition"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      
      {/* Danh sách sản phẩm khác */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Sản phẩm khác</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {demoProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedProduct(product)}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-primary-700">{product.price.toLocaleString('vi-VN')} đ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Widget chat */}
      <WidgetButton />
    </main>
  )
} 