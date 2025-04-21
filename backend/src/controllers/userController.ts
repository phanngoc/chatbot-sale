import { Request, Response } from 'express';
import { db } from '../services/database';

interface AuthRequest extends Request {
  userId?: string;
}

// Lấy danh sách sản phẩm đã xem
export const getViewedProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Người dùng chưa xác thực' });
    }
    
    // Giả định: có collection 'user_activities' lưu trữ các hành động của người dùng
    const viewedProducts = await db.collection('user_activities')
      .find({ userId, activity_type: 'view_product' })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
      
    return res.status(200).json({ 
      success: true, 
      data: viewedProducts 
    });
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm đã xem:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra khi lấy sản phẩm đã xem' 
    });
  }
};

// Lấy thông tin giỏ hàng
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Người dùng chưa xác thực' });
    }
    
    // Giả định: có collection 'carts' lưu trữ giỏ hàng của người dùng
    const cart = await db.collection('carts')
      .findOne({ userId });
      
    return res.status(200).json({ 
      success: true, 
      data: cart || { items: [] } 
    });
  } catch (error) {
    console.error('Lỗi khi lấy giỏ hàng:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra khi lấy giỏ hàng' 
    });
  }
};

// Lấy lịch sử đơn hàng
export const getOrderHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Người dùng chưa xác thực' });
    }
    
    // Giả định: có collection 'orders' lưu trữ đơn hàng
    const orders = await db.collection('orders')
      .find({ userId })
      .sort({ created_at: -1 })
      .limit(5)
      .toArray();
      
    return res.status(200).json({ 
      success: true, 
      data: orders 
    });
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra khi lấy lịch sử đơn hàng' 
    });
  }
}; 