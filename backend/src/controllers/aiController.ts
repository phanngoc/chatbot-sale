import { Request, Response } from 'express';
import { suggestReplies, processUserMessage, Message } from '../services/aiService';

/**
 * Controller xử lý gợi ý trả lời từ AI
 * @param req - Express request
 * @param res - Express response
 */
export const getSuggestedReplies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, conversationHistory, userData } = req.body;
    
    // Kiểm tra dữ liệu đầu vào
    if (!message) {
      res.status(400).json({
        success: false,
        message: 'Thiếu thông tin tin nhắn người dùng'
      });
      return;
    }

    // Chuyển đổi conversationHistory thành đúng định dạng nếu cần
    const formattedHistory: Message[] = Array.isArray(conversationHistory) 
      ? conversationHistory.map(msg => ({
          id: msg.id || '',
          text: msg.text || '',
          sender: msg.sender === 'user' ? 'user' : 'bot',
          timestamp: new Date(msg.timestamp) || new Date()
        }))
      : [];

    // Gọi service để lấy gợi ý trả lời
    const suggestions = await suggestReplies(message, formattedHistory, userData);

    // Trả về kết quả
    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Error generating reply suggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể tạo gợi ý trả lời. Vui lòng thử lại sau.'
    });
  }
}; 