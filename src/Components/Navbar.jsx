import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FiSun, FiMoon, FiBell, FiMenu } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import useAuthStore from '../Store/Auth';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

  // Get user data from auth store
  const { user, logout } = useAuthStore();
  const profileImg = user?.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg';
  const userName = user?.firstName || 'User';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/signIn'); // Navigate to home page after logout
  };

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
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={`Notifications (${notifications} unread)`}
          >
            <FiBell size={20} />
          </button>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>

        <div className="flex items-center relative" ref={dropdownRef}>
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {profileImg ? (
              <img
                src={profileImg}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-indigo-100"
              />
            ) : (
              <FaUserCircle className="h-8 w-8 text-gray-400" />
            )}
            <span className="ml-2 hidden md:inline">{userName}</span>
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;