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
  image?: string;
  category?: string;
  description?: string;
  url?: string;
}

// Cấu trúc sản phẩm trong giỏ hàng
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
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
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod?: string;
  shippingAddress?: string;
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

// Tracking Event Types
export type TrackingEventType = 
  | 'view_product'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'purchase'
  | string;

export interface TrackingEvent {
  anonymousId: string;
  userId?: string;
  eventType: TrackingEventType;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

// User Data
export interface UserActivity {
  userId: string;
  activity_type: TrackingEventType;
  timestamp: string;
  metadata: Record<string, any>;
}

// Tracking client configuration
export interface TrackingConfig {
  apiUrl: string;
  flushInterval: number;
  batchSize: number;
  debug: boolean;
}

// Tracking client interface
export interface TrackingClient {
  init(config?: Partial<TrackingConfig>): TrackingClient;
  identify(userId: string): TrackingClient;
  track(eventType: TrackingEventType, metadata?: Record<string, any>): TrackingClient;
  trackProductView(product: Partial<Product>): TrackingClient;
  trackAddToCart(product: Partial<CartItem>): TrackingClient;
  trackBeginCheckout(cart: Partial<Cart>): TrackingClient;
  trackPurchase(order: Partial<Order>): TrackingClient;
  flush(): TrackingClient;
} 