import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * Xử lý tin nhắn người dùng và tạo phản hồi sử dụng AI
 */
export async function processUserMessage(
  message: string,
  conversationHistory: Message[],
  userData?: any
): Promise<string> {
  try {
    // Tạo context từ lịch sử hội thoại
    const conversationContext = conversationHistory
      .slice(-10) // Giới hạn 10 tin nhắn gần nhất
      .map(msg => `${msg.sender === 'user' ? 'Khách hàng' : 'Bot'}: ${msg.text}`)
      .join('\n');

    // Tạo context từ dữ liệu người dùng (nếu có)
    let userContext = '';
    if (userData) {
      if (userData.currentProduct) {
        userContext += `\nKhách hàng đang xem sản phẩm: ${userData.currentProduct.name}, giá: ${userData.currentProduct.price}`;
      }
      
      if (userData.cartItems && userData.cartItems.length > 0) {
        userContext += `\nGiỏ hàng hiện tại:`;
        userData.cartItems.forEach((item: any) => {
          userContext += `\n- ${item.name}, số lượng: ${item.quantity}, giá: ${item.price}`;
        });
      }
      
      if (userData.orderHistory && userData.orderHistory.length > 0) {
        userContext += `\nKhách hàng có ${userData.orderHistory.length} đơn hàng trước đó.`;
      }
    }

    // Tạo prompt cho AI
    const prompt = `
Bạn là trợ lý AI hỗ trợ khách hàng cho một cửa hàng thương mại điện tử.
Hãy trả lời thân thiện, ngắn gọn và hữu ích.

THÔNG TIN KHÁCH HÀNG:
${userContext}

LỊCH SỬ HỘI THOẠI GẦN ĐÂY:
${conversationContext}

Khách hàng: ${message}
Bot:`;

    // Gọi OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 300
    });

    console.log('response AI',response.choices[0]?.message?.content?.trim());

    // Trả về phản hồi
    return response.choices[0]?.message?.content?.trim() || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return 'Xin lỗi, hệ thống AI hiện đang gặp sự cố. Vui lòng thử lại sau.';
  }
} 