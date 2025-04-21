'use client'

import { useState, useEffect } from 'react'
import { messageApi } from '../lib/api'

interface ChatReplyHelperProps {
  lastUserMessage: string
  conversationHistory: any[]
  userData?: any
  onSelectReply: (reply: string) => void
}

export default function ChatReplyHelper({
  lastUserMessage,
  conversationHistory,
  userData,
  onSelectReply
}: ChatReplyHelperProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lastUserMessage) return

    const getSuggestions = async () => {
      setLoading(true)
      setError(null)
      try {
        const suggestionsData = await messageApi.getSuggestedReplies(
          lastUserMessage,
          conversationHistory,
          userData
        )
        setSuggestions(suggestionsData)
      } catch (err) {
        console.error('Lỗi khi lấy gợi ý:', err)
        setError('Không thể lấy gợi ý trả lời. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    getSuggestions()
  }, [lastUserMessage, conversationHistory, userData])

  if (loading) {
    return (
      <div className="p-4 mt-4 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-gray-500">Đang tạo gợi ý trả lời...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 mt-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  if (suggestions.length === 0) return null

  return (
    <div className="p-4 mt-4 bg-gray-100 rounded-lg">
      <div className="flex items-center mb-3">
        <svg className="h-5 w-5 text-primary-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h3 className="text-sm font-medium">Gợi ý trả lời</h3>
      </div>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full text-left border border-gray-300 hover:bg-gray-50 rounded-lg p-3 text-sm text-gray-800"
            onClick={() => onSelectReply(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
} 