import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import { 
  getViewedProducts, 
  getCart, 
  getOrderHistory 
} from '../controllers/userController';

const router = Router();

// API route để lấy sản phẩm đã xem
router.get('/viewed-products', authenticateUser, getViewedProducts);

// API route để lấy giỏ hàng
router.get('/cart', authenticateUser, getCart);

// API route để lấy lịch sử đơn hàng
router.get('/order-history', authenticateUser, getOrderHistory);

export default router; 