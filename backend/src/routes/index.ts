import express from 'express';
import chatRoutes from './chatRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

// API routes
router.use('/chat', chatRoutes);
router.use('/users', userRoutes);

// Test route
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

export default router; 