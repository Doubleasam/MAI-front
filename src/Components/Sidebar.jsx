import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../assets/MAI.png";
import { 
  FiHome,
  FiUsers,
  FiUser,
  FiBell,
  FiDollarSign,
  FiPieChart,
  FiSettings,
  FiCalendar,
  FiFileText
} from 'react-icons/fi';
import { IoMdPerson } from 'react-icons/io';
import useAuthStore from '../Store/Auth'; // Import your auth store

function Sidebar() {
  // Get user data from auth store
  const { user } = useAuthStore();
  const userRole = user?.role || 'user'; // Default to 'user' if role not specified
  const isAffiliate = userRole === 'affiliate';

  return (
    <div className="fixed left-0 top-0 h-screen w-[276px] bg-white shadow-lg flex flex-col z-50 border-r border-gray-200">
      {/* Logo */}
      <div className="flex justify-center items-center h-20 p-4 border-b border-gray-200">
        <img src={Logo} alt="MAI Logo" className="h-12" />
      </div>

      {/* Conditional Navigation Based on Role */}
      <nav className="flex-1 p-4 space-y-1">
        {isAffiliate ? (
          // Affiliate Navigation
          <>
            <NavItem to="/dashboard" icon={<FiHome size={20} />} text="Home" />
            <NavItem to="/referrals" icon={<FiUsers size={20} />} text="Referrals" />
            <NavItem to="/notification" icon={<FiBell size={20} />} text="Notifications" />
            <NavItem to="/profile" icon={<IoMdPerson size={20} />} text="Profile" />
          </>
        ) : (
          // Regular User Navigation
          <>
            <NavItem to="/dashboard" icon={<FiHome size={20} />} text="Home" />
            <NavItem to="/group" icon={<FiUsers size={20} />} text="Groups" />
            <NavItem to="/notification" icon={<FiBell size={20} />} text="Notifications" />
            <NavItem to="/profile" icon={<FiUser size={20} />} text="Profile" />
          </>
        )}
      </nav>

      {/* Common Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <NavItem to="/settings" icon={<FiSettings size={20} />} text="Settings" />
      </div>
    </div>
  );
}

const NavItem = ({ to, icon, text }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => 
      `flex items-center p-3 rounded-lg transition-colors ${isActive ? 
        'bg-indigo-50 text-indigo-600 font-medium' : 
        'text-gray-600 hover:bg-gray-50'}`
    }
    end
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="ml-3 text-sm">{text}</span>
  </NavLink>
);

export default Sidebar;