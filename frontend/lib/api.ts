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