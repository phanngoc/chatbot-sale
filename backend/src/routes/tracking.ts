import { Router } from 'express';
import { 
  trackEvent, 
  getTrackedEvents 
} from '../controllers/trackingController';

const router = Router();

// API route để theo dõi hành vi người dùng
router.post('/event', trackEvent);

// API route để lấy các sự kiện đã theo dõi
router.get('/events', getTrackedEvents);

export default router; 