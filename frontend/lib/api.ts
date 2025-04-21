'use client'

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API liên quan đến tin nhắn
export const messageApi = {
  getSessionMessages: async (sessionId: string) => {
    try {
      const response = await api.get(`/chat/messages/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },
  
  /**
   * Lấy gợi ý trả lời từ AI
   * @param message Tin nhắn của khách hàng
   * @param conversationHistory Lịch sử hội thoại
   * @param userData Thông tin người dùng (sản phẩm đang xem, giỏ hàng, v.v.)
   * @returns Danh sách các gợi ý
   */
  getSuggestedReplies: async (
    message: string, 
    conversationHistory: any[] = [],
    userData?: any
  ) => {
    try {
      const response = await api.post('/chat/suggest-replies', {
        message,
        conversationHistory,
        userData
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error getting suggested replies:', error);
      return [];
    }
  }
};

// API liên quan đến người dùng
export const userApi = {
  getUserData: async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
  
  updateUserData: async (userId: string, data: any) => {
    try {
      const response = await api.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  },
  
  getUserOrders: async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },
};

export default api;

/**
 * Các hàm gọi API từ frontend đến backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Kiểu dữ liệu chung
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Lấy gợi ý trả lời từ AI
 * @param message Tin nhắn của khách hàng
 * @param conversationHistory Lịch sử hội thoại
 * @param userData Thông tin người dùng (sản phẩm đang xem, giỏ hàng, v.v.)
 * @returns Danh sách các gợi ý
 */
export async function getSuggestedReplies(
  message: string,
  conversationHistory: any[] = [],
  userData?: any
): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/suggest-replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        userData
      }),
    });

    const data: ApiResponse<string[]> = await response.json();

    if (!data.success) {
      console.error('API error:', data.message);
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error('Error calling suggest-replies API:', error);
    return [];
  }
} 