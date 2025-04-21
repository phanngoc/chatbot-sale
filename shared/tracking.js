/**
 * ChatbotInbox Tracking Script
 * Theo dõi hành vi người dùng và gửi dữ liệu đến API
 * 
 * Cách sử dụng:
 * 1. Nhúng script này vào website của bạn
 * 2. Sử dụng các phương thức ChatbotInbox.track để theo dõi hành vi
 */

(function(window, document) {
  // Cấu hình mặc định
  const defaultConfig = {
    apiUrl: 'https://api.chatbotinbox.com/api/tracking/event',
    flushInterval: 10000, // Thời gian gửi batch events (10 giây)
    batchSize: 10, // Số lượng events trong một batch
    debug: false
  };

  // Khởi tạo anonymous ID hoặc lấy từ localStorage
  const getAnonymousId = () => {
    let anonymousId = localStorage.getItem('cbi_anonymous_id');
    
    if (!anonymousId) {
      anonymousId = 'anon_' + Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cbi_anonymous_id', anonymousId);
    }
    
    return anonymousId;
  };

  // Khởi tạo đối tượng ChatbotInbox
  const ChatbotInbox = {
    // Hàm khởi tạo
    init: function(config = {}) {
      this.config = { ...defaultConfig, ...config };
      this.anonymousId = getAnonymousId();
      this.userId = null;
      this.eventQueue = [];
      this.flushTimer = null;
      
      // Log nếu ở chế độ debug
      if (this.config.debug) {
        console.log('ChatbotInbox Tracking Script được khởi tạo', this.config);
      }
      
      // Thiết lập timer để gửi events theo batch
      this.startFlushTimer();
      
      // Theo dõi sự kiện unload để đảm bảo gửi events trước khi người dùng rời trang
      window.addEventListener('beforeunload', () => this.flush());
      
      return this;
    },
    
    // Thiết lập userId (sau khi đăng nhập)
    identify: function(userId) {
      this.userId = userId;
      
      if (this.config.debug) {
        console.log('ChatbotInbox: Đã xác định userId', userId);
      }
      
      return this;
    },
    
    // Theo dõi sự kiện
    track: function(eventType, metadata = {}) {
      const event = {
        anonymousId: this.anonymousId,
        userId: this.userId,
        eventType,
        timestamp: new Date().toISOString(),
        metadata: {
          ...metadata,
          url: window.location.href,
          title: document.title,
          referrer: document.referrer
        }
      };
      
      this.eventQueue.push(event);
      
      if (this.config.debug) {
        console.log('ChatbotInbox: Đã theo dõi sự kiện', eventType, event);
      }
      
      // Nếu queue đã đạt giới hạn batch size, gửi ngay
      if (this.eventQueue.length >= this.config.batchSize) {
        this.flush();
      }
      
      return this;
    },
    
    // Gửi events đến server
    flush: function() {
      if (this.eventQueue.length === 0) return;
      
      const events = [...this.eventQueue];
      this.eventQueue = [];
      
      // Gửi dữ liệu lên server
      fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
        keepalive: true // Đảm bảo request hoàn thành ngay cả khi trang đóng
      })
      .then(response => response.json())
      .then(data => {
        if (this.config.debug) {
          console.log('ChatbotInbox: Đã gửi events thành công', data);
        }
      })
      .catch(error => {
        if (this.config.debug) {
          console.error('ChatbotInbox: Lỗi khi gửi events', error);
        }
        // Đưa các events trở lại queue để thử lại sau
        this.eventQueue = [...events, ...this.eventQueue];
      });
      
      return this;
    },
    
    // Thiết lập timer để gửi events theo định kỳ
    startFlushTimer: function() {
      if (this.flushTimer) {
        clearInterval(this.flushTimer);
      }
      
      this.flushTimer = setInterval(() => {
        this.flush();
      }, this.config.flushInterval);
    },
    
    // Convenience methods cho các sự kiện phổ biến
    
    // Theo dõi xem sản phẩm
    trackProductView: function(product) {
      return this.track('view_product', product);
    },
    
    // Theo dõi thêm vào giỏ hàng
    trackAddToCart: function(product) {
      return this.track('add_to_cart', product);
    },
    
    // Theo dõi bắt đầu thanh toán
    trackBeginCheckout: function(cart) {
      return this.track('begin_checkout', cart);
    },
    
    // Theo dõi hoàn tất thanh toán
    trackPurchase: function(order) {
      return this.track('purchase', order);
    }
  };
  
  // Tự động khởi tạo nếu có config global
  if (window.ChatbotInboxConfig) {
    ChatbotInbox.init(window.ChatbotInboxConfig);
  } else {
    ChatbotInbox.init();
  }
  
  // Gán đối tượng ChatbotInbox vào window
  window.ChatbotInbox = ChatbotInbox;
  
})(window, document); 