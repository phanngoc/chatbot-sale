# Hướng dẫn sử dụng ChatbotInbox Tracking

## 1. Cài đặt script theo dõi

### 1.1. Cách 1: Nhúng script qua CDN

```html
<!-- Thêm vào trước thẻ </body> -->
<script src="https://cdn.chatbotinbox.com/tracking.min.js"></script>
```

### 1.2. Cách 2: Tự host script

- Tải file `tracking.min.js` và tự host trên server của bạn
- Nhúng script vào website

```html
<!-- Thêm vào trước thẻ </body> -->
<script src="/your-path/tracking.min.js"></script>
```

### 1.3. Cách 3: Sử dụng NPM package

```bash
# Cài đặt qua npm
npm install chatbot-inbox-tracking

# Hoặc sử dụng yarn
yarn add chatbot-inbox-tracking
```

```javascript
// Import vào dự án của bạn
import chatbotInbox from 'chatbot-inbox-tracking';

// Hoặc nếu bạn muốn import class để tạo nhiều instance
import { ChatbotInboxClient } from 'chatbot-inbox-tracking';
```

## 2. Cấu hình

### 2.1. Cấu hình khi sử dụng script

```html
<script>
  window.ChatbotInboxConfig = {
    apiUrl: 'https://your-api-url.com/api/tracking/event', // API URL của bạn
    flushInterval: 10000, // Thời gian gửi batch events (mặc định 10 giây)
    batchSize: 10, // Số lượng events trong một batch (mặc định 10)
    debug: false // Bật chế độ debug (mặc định tắt)
  };
</script>
<script src="https://cdn.chatbotinbox.com/tracking.min.js"></script>
```

### 2.2. Cấu hình khi sử dụng NPM package

```javascript
import chatbotInbox from 'chatbot-inbox-tracking';

// Khởi tạo với cấu hình
chatbotInbox.init({
  apiUrl: 'https://your-api-url.com/api/tracking/event',
  flushInterval: 10000,
  batchSize: 10,
  debug: false
});

// Hoặc tạo instance mới
import { ChatbotInboxClient } from 'chatbot-inbox-tracking';

const tracker = new ChatbotInboxClient({
  apiUrl: 'https://your-api-url.com/api/tracking/event',
  debug: true
});
```

## 3. Sử dụng

### 3.1. Xác định người dùng (sau khi đăng nhập)

```javascript
// Gọi sau khi người dùng đăng nhập thành công
ChatbotInbox.identify('user_123');

// Hoặc khi sử dụng npm package
chatbotInbox.identify('user_123');
```

### 3.2. Theo dõi sự kiện tùy chỉnh

```javascript
// Theo dõi bất kỳ sự kiện nào
ChatbotInbox.track('event_name', {
  // Metadata của sự kiện
  key1: 'value1',
  key2: 'value2'
});

// Hoặc khi sử dụng npm package
chatbotInbox.track('event_name', {
  key1: 'value1',
  key2: 'value2'
});
```

### 3.3. Các phương thức theo dõi có sẵn

Script và package cung cấp sẵn các phương thức theo dõi cho các sự kiện phổ biến:

#### 3.3.1. Xem sản phẩm

```javascript
ChatbotInbox.trackProductView({
  productId: '123',
  name: 'Tên sản phẩm',
  price: 100000,
  category: 'Danh mục',
  image: 'https://example.com/image.jpg'
});

// Hoặc khi sử dụng npm package
chatbotInbox.trackProductView({
  id: '123',
  name: 'Tên sản phẩm',
  price: 100000,
  category: 'Danh mục',
  image: 'https://example.com/image.jpg'
});
```

#### 3.3.2. Thêm sản phẩm vào giỏ hàng

```javascript
ChatbotInbox.trackAddToCart({
  productId: '123',
  name: 'Tên sản phẩm',
  price: 100000,
  quantity: 1,
  image: 'https://example.com/image.jpg'
});

// Hoặc khi sử dụng npm package
chatbotInbox.trackAddToCart({
  productId: '123',
  name: 'Tên sản phẩm',
  price: 100000,
  quantity: 1,
  image: 'https://example.com/image.jpg'
});
```

#### 3.3.3. Bắt đầu thanh toán

```javascript
ChatbotInbox.trackBeginCheckout({
  items: [
    {
      productId: '123',
      name: 'Tên sản phẩm',
      price: 100000,
      quantity: 1
    }
  ],
  totalAmount: 100000
});

// Hoặc khi sử dụng npm package
chatbotInbox.trackBeginCheckout({
  items: [
    {
      productId: '123',
      name: 'Tên sản phẩm',
      price: 100000,
      quantity: 1
    }
  ],
  totalAmount: 100000
});
```

#### 3.3.4. Hoàn tất thanh toán

```javascript
ChatbotInbox.trackPurchase({
  orderId: 'ORDER123',
  items: [
    {
      productId: '123',
      name: 'Tên sản phẩm',
      price: 100000,
      quantity: 1
    }
  ],
  totalAmount: 100000,
  paymentMethod: 'Credit Card'
});

// Hoặc khi sử dụng npm package
chatbotInbox.trackPurchase({
  id: 'ORDER123',
  date: new Date().toISOString(),
  status: 'completed',
  items: [
    {
      productId: '123',
      name: 'Tên sản phẩm',
      price: 100000,
      quantity: 1
    }
  ],
  totalAmount: 100000,
  paymentMethod: 'Credit Card'
});
```

## 4. Auto-tracking

Script và package sẽ tự động thu thập các thông tin sau cho mọi sự kiện:

- URL trang hiện tại
- Tiêu đề trang
- Trang giới thiệu (referrer)
- User-Agent của trình duyệt
- Timestamp
- Anonymous ID (tự động tạo và lưu trong localStorage)
- User ID (nếu đã đăng nhập và gọi hàm identify)

## 5. Tích hợp với React

Khi sử dụng package với React, bạn có thể tạo một hook để sử dụng:

```javascript
// useTracking.js
import { useEffect } from 'react';
import chatbotInbox from 'chatbot-inbox-tracking';

export const useTracking = (userId) => {
  useEffect(() => {
    if (userId) {
      chatbotInbox.identify(userId);
    }
  }, [userId]);

  return chatbotInbox;
};

// Sử dụng trong component
import { useTracking } from './hooks/useTracking';

function ProductPage({ product, user }) {
  const tracking = useTracking(user?.id);
  
  useEffect(() => {
    if (product) {
      tracking.trackProductView(product);
    }
  }, [product, tracking]);
  
  // ...
} 