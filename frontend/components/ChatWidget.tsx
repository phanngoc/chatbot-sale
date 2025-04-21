'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from '@lib/useChat'
import ChatReplyHelper from './ChatReplyHelper'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}

interface ChatWidgetProps {
  onClose: () => void
}

export default function ChatWidget({ onClose }: ChatWidgetProps) {
  const [message, setMessage] = useState('')
  const { messages, sendMessage, isConnected } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Thêm biến userData giả lập, trong thực tế nên lấy từ context hoặc API
  const userData = {
    currentProduct: {
      name: "iPhone 13 Pro Max",
      price: "29.990.000 VNĐ"
    },
    cartItems: [
      { name: "Ốp lưng silicon", quantity: 1, price: "250.000 VNĐ" }
    ]
  }
  
  // Lấy tin nhắn cuối cùng của người dùng để gợi ý trả lời
  const lastUserMessage = messages
    .filter(msg => msg.sender === 'user')
    .slice(-1)[0]?.text || ''

  // Cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(message)
      setMessage('')
    }
  }
  
  const handleSelectReply = (reply: string) => {
    sendMessage(reply)
  }

  // Hiển thị gợi ý chỉ trong chế độ admin/nhân viên hỗ trợ
  const isStaff = true // Trong thực tế, nên lấy từ xác thực người dùng

  return (
    <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 h-96 border border-gray-200">
      {/* Header */}
      <div className="bg-primary-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium">Trò chuyện với cửa hàng</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Khu vực tin nhắn */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            Hãy bắt đầu cuộc trò chuyện với chúng tôi!
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-primary-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
        
        {/* Hiển thị gợi ý trả lời (chỉ cho nhân viên) */}
        {isStaff && lastUserMessage && (
          <ChatReplyHelper
            lastUserMessage={lastUserMessage}
            conversationHistory={messages}
            userData={userData}
            onSelectReply={handleSelectReply}
          />
        )}
      </div>

      {/* Footer với form nhập tin nhắn */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-500 text-white px-4 py-2 rounded-r-lg hover:bg-primary-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
      
      {/* Chỉ báo kết nối */}
      <div className={`text-xs p-1 text-center ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
        {isConnected ? 'Đã kết nối' : 'Đang kết nối...'}
      </div>
    </div>
  )
} 