import express, { Request, Response } from 'express';
import { getUserData, updateUserData, getUserOrderHistory } from '../services/userService';

const router = express.Router();

/**
 * Lấy thông tin người dùng
 */
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = await getUserData(userId);
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Không thể lấy thông tin người dùng. Vui lòng thử lại sau.' 
    });
  }
});

/**
 * Cập nhật thông tin người dùng
 */
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    
    const updatedUser = await updateUserData(userId, data);
    
    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy người dùng.' 
      });
    }
    
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Không thể cập nhật thông tin người dùng. Vui lòng thử lại sau.' 
    });
  }
});

/**
 * Lấy lịch sử đơn hàng của người dùng
 */
router.get('/:userId/orders', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await getUserOrderHistory(userId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user order history:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Không thể lấy lịch sử đơn hàng. Vui lòng thử lại sau.' 
    });
  }
});

export default router; 