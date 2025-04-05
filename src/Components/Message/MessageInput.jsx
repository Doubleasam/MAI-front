import React from 'react';
import { FiPaperclip, FiMic, FiSend } from 'react-icons/fi';

const MessageInput = ({ message, setMessage, handleSendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center">
        <button className="text-gray-500 hover:text-gray-700 mr-2">
          <FiPaperclip size={20} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={handleKeyPress}
        />
        <button className="text-gray-500 hover:text-gray-700 ml-2">
          <FiMic size={20} />
        </button>
        <button 
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;