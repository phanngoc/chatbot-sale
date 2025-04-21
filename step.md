Acquire new customers and close sales by connecting with shoppers in chat.
Shopify Inbox is a free messaging tool that lets you chat with customers as they shop. While you chat, use live customer information like products viewed, what’s in their cart, and past orders to tailor messages to your customer. Upsell by recommending products or offering discounts to increase order value. Quicker responses can increase conversion by up to 69%—help customers faster with Inbox’s AI-powered instant answers and suggested replies.

Add chat to your store with a seamless workflow in Shopify.
Answer questions quickly with AI-powered suggested replies.
Quickly understand who customers are with profile and cart details.
Send product recommendations, photos, and discounts without leaving the chat.
Automate greetings, contact capture, and FAQs to save you and your buyers time.


có hỗ trợ mutipass
https://shopify.dev/docs/api/multipass

Step 1: Enable Multipass

Step 2: Encode your customer information using JSON

Step 3: Encrypt the JSON data using AES

Step 4: Sign the encrypted data using HMAC

Step 5: Base64 encode the binary data

Step 6: Redirect your customer to your Shopify store


Dưới đây là **các prompt từng bước một dành cho AI editor như Cursor**, giúp bạn phát triển ứng dụng chatbot "Chatbot Inbox" cho website thương mại điện tử. Mỗi prompt được thiết kế để dẫn dắt quá trình phát triển rõ ràng, dễ hiểu, có thể copy dán trực tiếp vào Cursor hoặc AI code editor.

---

### 🔧 **1. Prompt khởi tạo cấu trúc app**

```plaintext
Tạo cấu trúc một ứng dụng web sử dụng Next.js (hoặc framework frontend khác) và Node.js/Express cho backend. Tính năng chính là hộp thư chat trực tiếp với khách hàng (Chatbot Inbox) trong trang thương mại điện tử. App này sẽ:
- Hiển thị widget chat phía frontend
- Gửi và nhận tin nhắn thời gian thực (WebSocket hoặc dùng Firebase)
- Tích hợp AI để gợi ý câu trả lời
- Kết nối dữ liệu người dùng: sản phẩm đã xem, giỏ hàng, đơn hàng trước đó
```

---

### 🤖 **2. Prompt xây dựng AI gợi ý câu trả lời (Suggested Replies)**

```plaintext
Tạo module AI gợi ý câu trả lời khách hàng trong cửa sổ chat. Input: đoạn tin nhắn khách gửi. Output: 3 gợi ý câu trả lời phù hợp, dùng ngôn ngữ thân thiện và có định hướng bán hàng. Có thể dùng GPT hoặc model nhẹ hơn. Cho ví dụ về prompt gửi đến model.
```

---

### 📦 **3. Prompt hiển thị thông tin người dùng trong chat**

```plaintext
Viết API và component frontend để hiển thị thông tin người dùng trong khi đang chat:
- Sản phẩm đã xem gần đây
- Sản phẩm trong giỏ hàng
- Lịch sử mua hàng
API trả về dữ liệu theo `user_id`. UI hiển thị trong khung bên của hộp chat.
```

---

### 🛍️ **4. Prompt gửi sản phẩm và mã giảm giá trong chat**

```plaintext
Tạo chức năng trong cửa sổ chat cho phép nhân viên:
- Gửi sản phẩm (hình ảnh, tên, giá, link)
- Gửi mã giảm giá (giá trị, hạn dùng, điều kiện)
Giao diện cần nút chọn sản phẩm và nhập mã. Backend xử lý việc gửi qua WebSocket đến khách.
```

---

### 🤖 **5. Prompt tự động hóa tin nhắn (automation)**

```plaintext
Tạo chức năng gửi tin nhắn tự động:
- Gửi lời chào khi khách vào website
- Hỏi tên/email để thu thập thông tin liên hệ
- Trả lời các câu hỏi FAQ (giờ làm việc, chính sách hoàn trả, v.v.)
Cho phép định nghĩa luật tự động trong file JSON cấu hình. Ví dụ:
```

```json
{
  "trigger": "visit_homepage",
  "action": "send_message",
  "message": "Chào bạn! Mình có thể giúp gì hôm nay?"
}
```

---

### 🧠 **6. Prompt tạo AI trả lời tự động các câu hỏi thường gặp**

```plaintext
Tạo hệ thống AI xử lý các câu hỏi thường gặp trong hộp chat. Câu hỏi có thể như: "Bao lâu nhận hàng?", "Có COD không?", "Phí vận chuyển là bao nhiêu?". AI nên match câu hỏi với câu trả lời từ danh sách câu hỏi đã có. Nếu không match được, sẽ chuyển cho nhân viên hỗ trợ.
```

---

### 📈 **7. Prompt đo lường hiệu quả chuyển đổi từ chat**

```plaintext
Tạo hệ thống thu thập dữ liệu để đo hiệu quả chat:
- Thời gian phản hồi trung bình
- Tỷ lệ khách chat có đơn hàng
- Tỷ lệ upsell (đơn hàng có sản phẩm từ gợi ý)
Gợi ý cách lưu trữ và dashboard hiển thị.
```

---

### 🚀 **8. Prompt tạo script nhúng widget vào website**

```plaintext
Tạo script đơn giản để nhúng widget chat vào bất kỳ website thương mại điện tử nào. Script này sẽ tải JavaScript client, hiển thị biểu tượng chat ở góc phải, mở hộp chat khi click. Cho ví dụ đoạn nhúng và hướng dẫn tích hợp.
```

---

Bạn muốn mình tạo file code mẫu cho bước nào trước? Ví dụ: module AI trả lời, component chat box, hay API gợi ý sản phẩm?



Tuyệt vời! Dưới đây là **bộ prompt chi tiết** cho AI Editor (như Cursor) để giúp bạn phát triển **API, component frontend và script tracking** liên quan đến hiển thị thông tin người dùng trong khi chat.

---

## 🧩 **1. Prompt tổng quát: Thiết kế hệ thống theo dõi người dùng khi đang chat**

```plaintext
Thiết kế hệ thống gồm:
- API backend để lấy thông tin người dùng (sản phẩm đã xem, giỏ hàng, lịch sử đơn hàng)
- Component frontend hiển thị các thông tin trên khi đang chat
- Script tracking để nhúng vào website theo dõi hành vi người dùng: xem sản phẩm, thêm vào giỏ, bắt đầu thanh toán, hoàn tất thanh toán
- Các hàm sự kiện cho developer dễ tích hợp như `window.ChatbotInbox.track('add_to_cart', data)`
Cho hướng dẫn rõ ràng cho từng phần.
```

---

## 🛠️ **2. Prompt: API backend lấy thông tin người dùng theo session ID hoặc user ID**

```plaintext
Viết API RESTful bằng Node.js + Express:
`GET /api/user/context?session_id=xyz` trả về:
```json
{
  "recent_views": [{ "product_id": 123, "title": "Áo thun", "image": "...", "price": 299000 }],
  "cart": [{ "product_id": 123, "qty": 2 }],
  "orders": [{ "order_id": "ORD123", "total": 598000, "status": "delivered" }]
}
```
API nên tìm từ Redis/cache hoặc DB. Nếu session chưa login thì dùng localStorage/session_id.
```

---

## 💻 **3. Prompt: Component hiển thị thông tin người dùng trong khung chat (React/Next.js)**

```plaintext
Tạo component React hiển thị thông tin người dùng khi đang chat:
- Tab 1: Sản phẩm đã xem
- Tab 2: Giỏ hàng hiện tại
- Tab 3: Lịch sử đơn hàng
Gọi API `/api/user/context?session_id=xyz` để lấy dữ liệu. Hiển thị hình ảnh, tên sản phẩm, số lượng trong cart, trạng thái đơn hàng.
```

---

## 📦 **4. Prompt: Script tracking hành vi người dùng (Xem SP, Thêm vào giỏ, Mua hàng)**

```plaintext
Viết JavaScript tracking script nhúng vào website để theo dõi hành vi người dùng:
```js
window.ChatbotInbox = {
  track: function(event, data) {
    // Gửi sự kiện về server
    fetch('/api/track', {
      method: 'POST',
      body: JSON.stringify({ event, data, timestamp: Date.now() }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

Các sự kiện cần track:
- `view_product`: { product_id, name, price }
- `add_to_cart`: { product_id, qty }
- `checkout_start`: { cart, user_email }
- `checkout_complete`: { order_id, amount }

Cho developer gợi ý sử dụng:
```js
ChatbotInbox.track('add_to_cart', { product_id: 123, qty: 1 });
```
```

---

## 🧪 **5. Prompt: Hướng dẫn developer tích hợp script**

```plaintext
Viết hướng dẫn dành cho developer tích hợp tracking script vào website:
1. Nhúng script sau vào `<head>`
```html
<script src="https://your-domain.com/chatbot-inbox.js"></script>
```
2. Gọi các sự kiện khi hành vi xảy ra:
```js
ChatbotInbox.track('view_product', { product_id: 1, name: 'Áo sơ mi', price: 250000 });
ChatbotInbox.track('add_to_cart', { product_id: 1, qty: 2 });
ChatbotInbox.track('checkout_start', { cart: [...], user_email: 'a@a.com' });
ChatbotInbox.track('checkout_complete', { order_id: 'ORD123', amount: 750000 });
```
3. Các sự kiện sẽ được lưu lại và liên kết với session hiện tại
```

---

## ⚙️ **6. Prompt: API xử lý dữ liệu tracking (server side)**

```plaintext
Viết API `POST /api/track` dùng Express để lưu tracking events từ client:
- Parse event name và dữ liệu
- Gắn vào session_id hoặc user_id
- Lưu vào MongoDB hoặc Redis stream để sử dụng trong khi chat
Đảm bảo không bị spam bằng cách throttle hoặc rate limit theo IP/session.
```

---

Bạn muốn mình viết code cụ thể phần nào trước? Ví dụ: script `chatbot-inbox.js`, API backend hay component React hiển thị thông tin chat?