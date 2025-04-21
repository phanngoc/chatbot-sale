import express from 'express';
import chatRoutes from './chatRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

// API routes
router.use('/chat', chatRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

// Test route
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

export default router; 