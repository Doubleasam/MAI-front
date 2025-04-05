import React from 'react';
import { FiMoreVertical, FiBell, FiLink, FiLogOut } from 'react-icons/fi';

const ChatHeader = ({ currentGroup, showMoreOptions, setShowMoreOptions, copyGroupLink, leaveGroup }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img 
            src={currentGroup?.image || "https://randomuser.me/api/portraits/women/65.jpg"} 
            alt="Group" 
            className="w-10 h-10 rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div>
          <h2 className="font-semibold">{currentGroup?.name || 'Loading...'}</h2>
          <p className="text-xs text-gray-500">
            {currentGroup?.members?.filter(m => m.isActive).length || 0} active members
          </p>
          <p className="text-xs text-gray-400">
            Admin: {currentGroup?.admin?.email || 'N/A'}
          </p>
          <p className="text-xs text-gray-400">
            {currentGroup?.description || 'No description available'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 relative">
        <button className="text-gray-500 hover:text-gray-700">
          <FiBell size={20} />
        </button>
        <div className="relative">
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            <FiMoreVertical size={20} />
          </button>
          {showMoreOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={copyGroupLink}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <FiLink className="mr-2" />
                Copy Group Link
              </button>
              <button
                onClick={leaveGroup}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
              >
                <FiLogOut className="mr-2" />
                Leave Group
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;