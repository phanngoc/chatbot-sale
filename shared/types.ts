// Types chung giữa frontend và backend

// Loại tin nhắn
export type MessageSender = 'user' | 'bot';

// Cấu trúc tin nhắn
export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Cấu trúc phiên Chat
export interface ChatSession {
  id: string;
  userId: string;
  startedAt: Date;
  lastActivity: Date;
  messages: Message[];
}

// Cấu trúc sản phẩm
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  inStock: boolean;
}

// Cấu trúc sản phẩm trong giỏ hàng
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Cấu trúc thông tin người dùng
export interface UserProfile {
  userId: string;
  name?: string;
  email?: string;
  orderHistory?: Order[];
  preferences?: UserPreferences;
}

// Cấu trúc đơn hàng
export interface Order {
  orderId: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
  shippingAddress?: Address;
  paymentMethod?: string;
}

// Địa chỉ giao hàng
export interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
}

// Cấu hình người dùng
export interface UserPreferences {
  categories?: string[];
  favoriteProducts?: string[];
  theme?: 'light' | 'dark';
  notificationSettings?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
} 