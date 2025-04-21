import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: CartItem[];
}

const UserDataPanel: React.FC = () => {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Lấy token từ localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('Chưa đăng nhập');
          setLoading(false);
          return;
        }
        
        const headers = {
          Authorization: `Bearer ${token}`
        };
        
        // Lấy dữ liệu song song
        const [viewedRes, cartRes, ordersRes] = await Promise.all([
          axios.get(`${API_URL}/user/viewed-products`, { headers }),
          axios.get(`${API_URL}/user/cart`, { headers }),
          axios.get(`${API_URL}/user/order-history`, { headers })
        ]);
        
        setViewedProducts(viewedRes.data.data || []);
        setCart(cartRes.data.data?.items || []);
        setOrders(ordersRes.data.data || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu người dùng:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [API_URL]);
  
  // Component hiển thị sản phẩm
  const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
    <div className="flex items-center p-2 border-b">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-12 h-12 object-cover rounded mr-3" 
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{product.name}</h4>
        <p className="text-sm text-green-600">{product.price.toLocaleString('vi-VN')}đ</p>
      </div>
    </div>
  );
  
  // Component hiển thị giỏ hàng
  const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => (
    <div className="flex items-center p-2 border-b">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-12 h-12 object-cover rounded mr-3" 
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.name}</h4>
        <div className="flex justify-between">
          <p className="text-sm text-green-600">{item.price.toLocaleString('vi-VN')}đ</p>
          <p className="text-sm">SL: {item.quantity}</p>
        </div>
      </div>
    </div>
  );
  
  // Component hiển thị đơn hàng
  const OrderItem: React.FC<{ order: Order }> = ({ order }) => (
    <div className="p-3 mb-2 rounded border">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">#{order.id}</span>
        <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('vi-VN')}</span>
      </div>
      
      <div className="flex justify-between mb-1">
        <span className="font-medium">Tổng tiền:</span>
        <span className="font-medium text-green-600">{order.total.toLocaleString('vi-VN')}đ</span>
      </div>
      
      <div className="flex justify-between">
        <span>Trạng thái:</span>
        <span className={`text-sm ${
          order.status === 'completed' ? 'text-green-600' :
          order.status === 'processing' ? 'text-blue-600' :
          order.status === 'cancelled' ? 'text-red-600' : 'text-gray-600'
        }`}>
          {
            order.status === 'completed' ? 'Hoàn thành' :
            order.status === 'processing' ? 'Đang xử lý' :
            order.status === 'cancelled' ? 'Đã hủy' : order.status
          }
        </span>
      </div>
    </div>
  );
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 h-96 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Tab.Group>
        <Tab.List className="flex bg-gray-100 p-1">
          <Tab className={({ selected }) => 
            `w-full py-2 rounded-t-md text-sm font-medium focus:outline-none
             ${selected ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-200'}`
          }>
            Sản phẩm đã xem
          </Tab>
          <Tab className={({ selected }) => 
            `w-full py-2 rounded-t-md text-sm font-medium focus:outline-none
             ${selected ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-200'}`
          }>
            Giỏ hàng
          </Tab>
          <Tab className={({ selected }) => 
            `w-full py-2 rounded-t-md text-sm font-medium focus:outline-none
             ${selected ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-200'}`
          }>
            Đơn hàng
          </Tab>
        </Tab.List>
        
        <Tab.Panels className="h-80 overflow-y-auto">
          <Tab.Panel className="h-full">
            {viewedProducts.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {viewedProducts.map(product => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Chưa có sản phẩm đã xem</p>
              </div>
            )}
          </Tab.Panel>
          
          <Tab.Panel className="h-full">
            {cart.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <CartItemComponent key={item.productId} item={item} />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Giỏ hàng trống</p>
              </div>
            )}
          </Tab.Panel>
          
          <Tab.Panel className="h-full p-2">
            {orders.length > 0 ? (
              <div>
                {orders.map(order => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Chưa có đơn hàng nào</p>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserDataPanel; 