import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatbot_sales';
const DB_NAME = process.env.DB_NAME || 'chatbot_sales';

let dbInstance: Db;
let client: MongoClient;

export const connectToDatabase = async (): Promise<Db> => {
  try {
    if (dbInstance) {
      return dbInstance;
    }

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    dbInstance = client.db(DB_NAME);
    console.log('Kết nối thành công đến MongoDB');
    
    return dbInstance;
  } catch (error) {
    console.error('Lỗi kết nối đến MongoDB:', error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    console.log('Đã đóng kết nối MongoDB');
  }
};

// Khởi tạo kết nối và export db
let db: Db;

const initializeDb = async () => {
  try {
    db = await connectToDatabase();
  } catch (error) {
    console.error('Không thể khởi tạo cơ sở dữ liệu:', error);
    process.exit(1);
  }
};

// Gọi hàm khởi tạo
initializeDb();

export { db }; 