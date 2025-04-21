import { MessageModel } from '../models/Message';

interface MessageData {
  messageId: string;
  sessionId: string;
  userId: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * Lưu tin nhắn vào cơ sở dữ liệu
 */
export async function saveMessage(messageData: MessageData): Promise<void> {
  try {
    await MessageModel.create({
      messageId: messageData.messageId,
      sessionId: messageData.sessionId,
      userId: messageData.userId,
      text: messageData.text,
      sender: messageData.sender,
      timestamp: messageData.timestamp
    });
  } catch (error) {
    console.error('Error saving message to database:', error);
    // Lỗi khi lưu tin nhắn không quá nghiêm trọng, chỉ log lỗi
  }
}

/**
 * Lấy lịch sử tin nhắn của một phiên
 */
export async function getSessionMessages(sessionId: string) {
  try {
    return await MessageModel.find({ sessionId })
      .sort({ timestamp: 1 })
      .lean();
  } catch (error) {
    console.error('Error retrieving session messages:', error);
    return [];
  }
}

/**
 * Lấy lịch sử tin nhắn của một người dùng
 */
export async function getUserMessages(userId: string, limit = 100) {
  try {
    return await MessageModel.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
  } catch (error) {
    console.error('Error retrieving user messages:', error);
    return [];
  }
} 