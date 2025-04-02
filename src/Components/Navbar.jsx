import React, { useState } from 'react';
import { FiSun, FiMoon, FiBell, FiMenu } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);
  const profileImg = 'https://randomuser.me/api/portraits/men/1.jpg';

  return (
    <div className={`fixed top-0 left-[276px] right-0 h-16 flex items-center ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } shadow-sm z-40 border-b border-gray-200 px-4`}>
      
      {/* Left-aligned Hamburger Button */}
      <button
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <FiMenu size={20} />
      </button>

      {/* Spacer div that pushes right icons to the end */}
      <div className="flex-1"></div>

      {/* Right-aligned Icons */}
      <div className="flex items-center gap-4 sm:gap-5">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <div className="relative">
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiBell size={20} />
          </button>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <img 
            src={profileImg} 
            alt="Profile" 
            className="h-8 w-8 rounded-full object-cover border-2 border-indigo-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;