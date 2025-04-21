'use client'

import { useState, useEffect, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface ChatHook {
  messages: Message[]
  sendMessage: (text: string) => void
  isConnected: boolean
}

export function useChat(): ChatHook {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Khởi tạo kết nối socket
  useEffect(() => {
    // URL của server backend
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000')
    
    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    // Lắng nghe tin nhắn từ bot
    socketInstance.on('bot-message', (message: string) => {
      const botMessage: Message = {
        id: uuidv4(),
        sender: 'bot',
        text: message,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    })

    setSocket(socketInstance)

    // Dọn dẹp khi component unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Gửi tin nhắn
  const sendMessage = useCallback((text: string) => {
    if (!socket || !isConnected) return

    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      text,
      timestamp: new Date()
    }

    // Thêm tin nhắn người dùng vào state
    setMessages(prev => [...prev, userMessage])
    
    // Gửi tin nhắn đến server
    socket.emit('user-message', {
      message: text,
      userId: socket.id,
      // Có thể thêm dữ liệu context như: sản phẩm đang xem, giỏ hàng, v.v.
      context: {
        currentProduct: null, // Sẽ được điền khi tích hợp vào trang sản phẩm
        cartItems: []         // Sẽ được điền từ state giỏ hàng
      }
    })
  }, [socket, isConnected])

  return { messages, sendMessage, isConnected }
}