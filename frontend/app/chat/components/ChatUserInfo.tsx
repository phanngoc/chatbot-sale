import React from 'react';
import dynamic from 'next/dynamic';

// Import UserDataPanel với dynamic để tránh lỗi hydration
const UserDataPanel = dynamic(() => import('../../../components/UserDataPanel'), { 
  ssr: false 
});

interface ChatUserInfoProps {
  isVisible: boolean;
}

const ChatUserInfo: React.FC<ChatUserInfoProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute top-0 right-0 w-80 h-full p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Thông tin người dùng</h3>
        <p className="text-sm text-gray-500">Dưới đây là thông tin về hoạt động của bạn</p>
      </div>
      
      <div className="mb-4">
        <UserDataPanel />
      </div>
    </div>
  );
};

export default ChatUserInfo; 