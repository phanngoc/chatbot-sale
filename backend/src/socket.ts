import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { processUserMessage } from './services/aiService';
import { saveMessage } from './services/messageService';
import { getUserData } from './services/userService';

// Lưu trữ phiên chat tạm thời
interface Session {
  id: string;
  userId: string;
  userInfo?: any;
  messages: Array<{
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }>;
}

// Lưu trữ các phiên trong bộ nhớ (trong thực tế, nên lưu vào DB)
const sessions: Record<string, Session> = {};

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);
    
    // Tạo phiên mới khi có kết nối
    sessions[socket.id] = {
      id: uuidv4(),
      userId: socket.id,
      messages: []
    };

    // Xử lý tin nhắn từ người dùng
    socket.on('user-message', async (data: { 
      message: string;
      userId: string;
      context?: {
        currentProduct: any;
        cartItems: any[];
      }
    }) => {
      const { message, context } = data;
      const session = sessions[socket.id];
      
      if (!session) return;

      // Lưu tin nhắn của người dùng
      const userMessageId = uuidv4();
      const userMessage = {
        id: userMessageId,
        text: message,
        sender: 'user' as const,
        timestamp: new Date()
      };
      
      session.messages.push(userMessage);
      
      try {
        // Lưu tin nhắn vào DB (không đồng bộ, không cần chờ)
        saveMessage({
          messageId: userMessageId,
          sessionId: session.id,
          userId: session.userId,
          text: message,
          sender: 'user',
          timestamp: new Date()
        });

        // Nếu có context thông tin người dùng, cập nhật vào phiên
        if (context) {
          session.userInfo = {
            ...session.userInfo,
            currentProduct: context.currentProduct,
            cartItems: context.cartItems
          };
        }

        // Lấy thêm dữ liệu người dùng nếu cần
        const userData = await getUserData(session.userId);
        
        // Xử lý tin nhắn với AI và tạo phản hồi
        const botResponse = await processUserMessage(
          message, 
          session.messages,
          {
            ...userData,
            ...session.userInfo
          }
        );

        // Tạo và lưu tin nhắn bot
        const botMessageId = uuidv4();
        const botMessage = {
          id: botMessageId,
          text: botResponse,
          sender: 'bot' as const,
          timestamp: new Date()
        };
        
        session.messages.push(botMessage);
        
        // Gửi phản hồi đến người dùng
        socket.emit('bot-message', botResponse);
        
        // Lưu tin nhắn bot vào DB
        saveMessage({
          messageId: botMessageId,
          sessionId: session.id,
          userId: session.userId,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Error processing message:', error);
        socket.emit('bot-message', 'Xin lỗi, hiện tại hệ thống đang gặp vấn đề. Vui lòng thử lại sau.');
      }
    });

    // Xử lý ngắt kết nối
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Lưu phiên chat vào DB trước khi xóa khỏi bộ nhớ
      // ...
      delete sessions[socket.id];
    });
  });
}; 