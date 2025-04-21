import { 
  TrackingClient, 
  TrackingConfig, 
  TrackingEventType, 
  Product, 
  CartItem, 
  Cart, 
  Order
} from './types';

/**
 * Class ChatbotInboxClient
 * Cung cấp một cách dễ dàng để tích hợp với ChatbotInbox từ mã nguồn
 */
export class ChatbotInboxClient implements TrackingClient {
  private config: TrackingConfig;
  private anonymousId: string;
  private userId: string | null = null;
  private eventQueue: any[] = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private isNode: boolean;

  /**
   * Khởi tạo ChatbotInboxClient
   * @param config Cấu hình tùy chọn
   */
  constructor(config?: Partial<TrackingConfig>) {
    // Kiểm tra môi trường
    this.isNode = typeof window === 'undefined';
    
    // Cấu hình mặc định
    const defaultConfig: TrackingConfig = {
      apiUrl: 'https://api.chatbotinbox.com/api/tracking/event',
      flushInterval: 10000,
      batchSize: 10,
      debug: false
    };
    
    this.config = { ...defaultConfig, ...config };
    
    // Tạo anonymousId
    this.anonymousId = this.generateAnonymousId();
    
    // Thiết lập timer để gửi events theo batch
    this.startFlushTimer();
  }
  
  /**
   * Khởi tạo client với cấu hình
   * @param config Cấu hình tùy chọn
   */
  init(config?: Partial<TrackingConfig>): ChatbotInboxClient {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    
    this.log('ChatbotInbox Client được khởi tạo', this.config);
    return this;
  }
  
  /**
   * Xác định người dùng (sau khi đăng nhập)
   * @param userId ID của người dùng
   */
  identify(userId: string): ChatbotInboxClient {
    this.userId = userId;
    this.log('Đã xác định userId', userId);
    return this;
  }
  
  /**
   * Theo dõi một sự kiện tùy chỉnh
   * @param eventType Loại sự kiện
   * @param metadata Dữ liệu bổ sung
   */
  track(eventType: TrackingEventType, metadata: Record<string, any> = {}): ChatbotInboxClient {
    const event = {
      anonymousId: this.anonymousId,
      userId: this.userId,
      eventType,
      timestamp: new Date().toISOString(),
      metadata: this.enrichMetadata(metadata)
    };
    
    this.eventQueue.push(event);
    this.log('Đã theo dõi sự kiện', eventType, event);
    
    // Nếu queue đã đạt giới hạn batch size, gửi ngay
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush();
    }
    
    return this;
  }
  
  /**
   * Theo dõi xem sản phẩm
   * @param product Thông tin sản phẩm
   */
  trackProductView(product: Partial<Product>): ChatbotInboxClient {
    return this.track('view_product', product);
  }
  
  /**
   * Theo dõi thêm vào giỏ hàng
   * @param product Thông tin sản phẩm
   */
  trackAddToCart(product: Partial<CartItem>): ChatbotInboxClient {
    return this.track('add_to_cart', product);
  }
  
  /**
   * Theo dõi bắt đầu thanh toán
   * @param cart Thông tin giỏ hàng
   */
  trackBeginCheckout(cart: Partial<Cart>): ChatbotInboxClient {
    return this.track('begin_checkout', cart);
  }
  
  /**
   * Theo dõi hoàn tất thanh toán
   * @param order Thông tin đơn hàng
   */
  trackPurchase(order: Partial<Order>): ChatbotInboxClient {
    return this.track('purchase', order);
  }
  
  /**
   * Gửi tất cả các sự kiện đã theo dõi đến server
   */
  flush(): ChatbotInboxClient {
    if (this.eventQueue.length === 0) return this;
    
    const events = [...this.eventQueue];
    this.eventQueue = [];
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events })
    };
    
    // Gửi dữ liệu lên server
    if (this.isNode) {
      // Node.js environment
      const fetch = require('node-fetch');
      fetch(this.config.apiUrl, options)
        .then((response: any) => response.json())
        .then((data: any) => {
          this.log('Đã gửi events thành công', data);
        })
        .catch((error: any) => {
          this.error('Lỗi khi gửi events', error);
          // Đưa các events trở lại queue để thử lại sau
          this.eventQueue = [...events, ...this.eventQueue];
        });
    } else {
      // Browser environment
      fetch(this.config.apiUrl, options)
        .then(response => response.json())
        .then(data => {
          this.log('Đã gửi events thành công', data);
        })
        .catch(error => {
          this.error('Lỗi khi gửi events', error);
          // Đưa các events trở lại queue để thử lại sau
          this.eventQueue = [...events, ...this.eventQueue];
        });
    }
    
    return this;
  }
  
  /**
   * Phương thức private để tạo anonymousId
   */
  private generateAnonymousId(): string {
    if (!this.isNode) {
      // Browser: Lấy từ localStorage nếu có
      const storedId = localStorage.getItem('cbi_anonymous_id');
      if (storedId) return storedId;
    }
    
    // Tạo mới nếu chưa có
    const newId = 'anon_' + Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    
    if (!this.isNode) {
      // Lưu vào localStorage nếu đang ở browser
      localStorage.setItem('cbi_anonymous_id', newId);
    }
    
    return newId;
  }
  
  /**
   * Bổ sung thêm metadata cho sự kiện
   */
  private enrichMetadata(metadata: Record<string, any>): Record<string, any> {
    if (this.isNode) {
      // Trong Node.js không có window/document
      return metadata;
    }
    
    // Trong browser, bổ sung thêm thông tin
    return {
      ...metadata,
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };
  }
  
  /**
   * Thiết lập timer để gửi events theo định kỳ
   */
  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }
  
  /**
   * Phương thức log cho debug
   */
  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[ChatbotInbox]', ...args);
    }
  }
  
  /**
   * Phương thức log lỗi
   */
  private error(...args: any[]): void {
    if (this.config.debug) {
      console.error('[ChatbotInbox]', ...args);
    }
  }
}

// Export một instance sẵn sàng sử dụng
export const chatbotInbox = new ChatbotInboxClient();

// Export default để import dễ dàng
export default chatbotInbox; 