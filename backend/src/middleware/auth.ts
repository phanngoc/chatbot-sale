import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Không tìm thấy token xác thực' });
    }
    
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'default_secret';
    
    const decoded: any = jwt.verify(token, secret);
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.error('Lỗi xác thực:', error);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}; 