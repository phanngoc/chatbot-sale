import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import trackingRoutes from './routes/tracking';
import { connectToDatabase } from './services/database';

// Cấu hình môi trường
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/tracking', trackingRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server đang hoạt động' });
});

// Khởi động server
const startServer = async () => {
  try {
    // Kết nối đến database
    await connectToDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại cổng ${PORT}`);
    });
  } catch (error) {
    console.error('Không thể khởi động server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 