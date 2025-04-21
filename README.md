# Chatbot Bán Hàng

Ứng dụng chatbot bán hàng trực tuyến với tính năng chat trực tiếp với khách hàng và hỗ trợ AI.

## Tính năng

- Widget chat tích hợp cho giao diện thương mại điện tử
- Giao tiếp thời gian thực qua WebSocket
- Trợ lý AI giúp gợi ý phản hồi cho nhân viên bán hàng
- Tích hợp dữ liệu người dùng (sản phẩm đã xem, giỏ hàng, đơn hàng)

## Công nghệ sử dụng

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Express
- **Cơ sở dữ liệu**: MongoDB
- **Thời gian thực**: Socket.io
- **AI**: OpenAI API

## Cài đặt

```bash
# Cài đặt tất cả dependencies
npm run setup

# Chạy môi trường development
npm run dev
```

## Cấu trúc dự án

- `/frontend`: Ứng dụng Next.js
- `/backend`: API Express và logic server
- `/shared`: Các types và utilities chung 