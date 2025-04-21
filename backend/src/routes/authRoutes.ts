import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

/**
 * Đăng nhập
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Demo - thông thường bạn sẽ kiểm tra trên database
    if (email === 'admin@example.com' && password === 'password123') {
      // Tạo JWT token
      const token = jwt.sign(
        { id: '1', email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );

      // Trả về thông tin người dùng và token
      return res.status(200).json({
        success: true,
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
        },
        token
      });
    }

    // Đăng nhập thất bại
    return res.status(401).json({
      success: false,
      message: 'Email hoặc mật khẩu không chính xác'
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau.'
    });
  }
});

/**
 * Kiểm tra token hợp lệ
 */
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token là bắt buộc'
      });
    }

    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    return res.status(200).json({
      success: true,
      data: decoded
    });
  } catch (error) {
    console.error('Lỗi xác minh token:', error);
    res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn'
    });
  }
});

export default router; 