import React, { useState, useEffect } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import useAuthStore from "../../Store/Auth";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Display error/success messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className={`flex min-h-screen px-4 md:px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Notification messages */}
      {(error || success) && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${error ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {error || success}
        </div>
      )}

      {/* Sidebar */}
      <ProfileSidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        handleLogout={logout}
      />

      {/* Main Content */}
      <ProfileContent
        activeTab={activeTab}
        user={user}
        updateProfile={updateProfile}
        darkMode={darkMode}
        setError={setError}
        setSuccess={setSuccess}
      />
    </div>
  );
};

export default ProfilePage;