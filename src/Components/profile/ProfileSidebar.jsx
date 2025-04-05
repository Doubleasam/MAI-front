import React from "react";
import { FiEdit } from "react-icons/fi";

const ProfileSidebar = ({ user, activeTab, setActiveTab, darkMode, toggleDarkMode, handleLogout }) => {
  return (
    <aside className={`w-full md:w-1/3 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* User Profile */}
      <div className="flex flex-wrap items-center gap-5 mb-6">
        <img
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold truncate">{user?.firstName || user?.username}</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} truncate`}>{user?.email}</p>
        </div>
        <button
          className={`text-sm flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
          onClick={() => setActiveTab("profile")}
        >
          <FiEdit className="mr-1" /> Edit
        </button>
      </div>

      {/* Navigation */}
      <nav>
        <h3 className={`text-sm uppercase mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Settings</h3>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer hover:text-blue-500 ${activeTab === "profile" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </li>
          <li
            className={`cursor-pointer hover:text-blue-500 ${activeTab === "security" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setActiveTab("security")}
          >
            Password & Security
          </li>
          <li
            className={`cursor-pointer hover:text-blue-500 ${activeTab === "notifications" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </li>
        </ul>

        <h3 className={`text-sm uppercase mt-4 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payout and Settings</h3>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer hover:text-blue-500 ${activeTab === "bank" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setActiveTab("bank")}
          >
            Bank Details
          </li>
          <li
            className={`cursor-pointer hover:text-blue-500 ${activeTab === "wallet" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setActiveTab("wallet")}
          >
            Wallet
          </li>
        </ul>

        <h3 className={`text-sm uppercase mt-4 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Others</h3>
        <ul className="space-y-3">
          <li
            className={`flex justify-between items-center cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={toggleDarkMode}
          >
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </li>
          <li className={`cursor-pointer hover:text-blue-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            FAQ
          </li>
          <li 
            className={`cursor-pointer hover:text-red-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;