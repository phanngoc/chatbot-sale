import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface Message {
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

/**
 * Gợi ý các câu trả lời cho nhân viên hỗ trợ khách hàng
 * @param message Tin nhắn của khách hàng
 * @param conversationHistory Lịch sử hội thoại
 * @param userData Thông tin người dùng (sản phẩm đang xem, giỏ hàng, v.v.)
 * @returns Mảng chứa 3 gợi ý câu trả lời
 */
export async function suggestReplies(
  message: string,
  conversationHistory: Message[],
  userData?: any
): Promise<string[]> {
  try {
    // Tạo context từ lịch sử hội thoại
    const conversationContext = conversationHistory
      .slice(-5) // Giới hạn 5 tin nhắn gần nhất
      .map(msg => `${msg.sender === 'user' ? 'Khách hàng' : 'Nhân viên'}: ${msg.text}`)
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
Bạn là trợ lý AI hỗ trợ nhân viên bán hàng trả lời khách hàng tại một cửa hàng thương mại điện tử.
Hãy đề xuất 3 câu trả lời khác nhau cho tin nhắn của khách hàng. Mỗi câu trả lời phải:
1. Thân thiện và chuyên nghiệp
2. Ngắn gọn và dễ hiểu (không quá 2-3 câu)
3. Có định hướng bán hàng và chuyển đổi (gợi ý sản phẩm, khuyến khích mua hàng, v.v.)
4. Đáp ứng nhu cầu của khách hàng một cách hiệu quả

THÔNG TIN KHÁCH HÀNG:
${userContext}

LỊCH SỬ HỘI THOẠI GẦN ĐÂY:
${conversationContext}

Tin nhắn của khách hàng: ${message}

Đưa ra 3 gợi ý câu trả lời, mỗi gợi ý bắt đầu bằng "Gợi ý 1:", "Gợi ý 2:", "Gợi ý 3:" và phân tách bằng dòng mới.`;

    // Gọi OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 500
    });

    // Xử lý phản hồi từ AI
    const content = response.choices[0]?.message?.content?.trim() || '';
    
    // Tách các gợi ý từ nội dung trả về
    const suggestions: string[] = [];
    const lines = content.split('\n');
    let currentSuggestion = '';
    
    for (const line of lines) {
      if (line.startsWith('Gợi ý ')) {
        if (currentSuggestion) {
          suggestions.push(currentSuggestion.trim());
        }
        currentSuggestion = line.replace(/^Gợi ý \d+:/, '').trim();
      } else if (line && currentSuggestion) {
        currentSuggestion += ' ' + line.trim();
      }
    }
    
    if (currentSuggestion) {
      suggestions.push(currentSuggestion.trim());
    }
    
    // Đảm bảo có đúng 3 gợi ý
    while (suggestions.length < 3) {
      suggestions.push('Xin chào quý khách! Tôi có thể giúp gì cho bạn hôm nay?');
    }
    
    return suggestions.slice(0, 3);
  } catch (error) {
    console.error('Error generating reply suggestions:', error);
    return [
      'Xin chào quý khách! Tôi có thể giúp gì cho bạn hôm nay?',
      'Cảm ơn bạn đã liên hệ với chúng tôi. Tôi có thể tư vấn sản phẩm nào cho bạn?',
      'Chào mừng quý khách! Chúng tôi đang có nhiều ưu đãi hấp dẫn, bạn muốn tìm hiểu thêm không?'
    ];
  }
}
 