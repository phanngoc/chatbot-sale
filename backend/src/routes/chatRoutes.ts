import express, { Request, Response } from 'express';
import { getSessionMessages } from '../services/messageService';

const router = express.Router();

/**
 * Lấy lịch sử tin nhắn của một phiên
 */
router.get('/messages/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const messages = await getSessionMessages(sessionId);
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching session messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Không thể lấy tin nhắn. Vui lòng thử lại sau.' 
    });
  }
});

export default router; 