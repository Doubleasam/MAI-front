import React from 'react';
import { FiUser, FiShield } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const MessageList = ({ groupMessages, currentUser }) => {
  // Check if groupMessages exists and has data array
  if (!groupMessages || !groupMessages.data || !Array.isArray(groupMessages.data)) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No messages yet</p>
      </div>
    );
  }

  // Sort messages by createdAt timestamp in ascending order
  const sortedMessages = [...groupMessages.data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {sortedMessages.map((msg) => {
        // Check if sender exists and has _id property
        const isCurrentUser = msg.sender && msg.sender._id === currentUser?._id;
        
        return (
          <div 
            key={msg._id} 
            className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-white'}`}>
              {!isCurrentUser && msg.sender && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="font-semibold text-sm">
                    {msg.sender.name || msg.sender.email || 'Unknown User'}
                  </div>
                  {msg.sender.role === 'admin' && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                      <FaCrown className="inline mr-1" size={10} /> Admin
                    </span>
                  )}
                  {msg.sender.role === 'moderator' && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      <FiShield className="inline mr-1" size={10} /> Moderator
                    </span>
                  )}
                </div>
              )}
              <div className="text-sm">{msg.text}</div>
              <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  day: 'numeric',
                  month: 'short'
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;