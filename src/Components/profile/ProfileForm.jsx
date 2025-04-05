import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

const ProfileForm = ({ user, updateProfile, darkMode, setError, setSuccess }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "https://via.placeholder.com/150"
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize profile data from user
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        avatar: user.avatar || "https://via.placeholder.com/150"
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      
      await updateProfile(formData);
      
      setProfileData(prev => ({
        ...prev,
        avatar: previewImage
      }));
      setSuccess("Profile picture updated successfully!");
    } catch (error) {
      setError(error.message || "Failed to update profile picture");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const saveProfileChanges = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        username: profileData.username
      });
      
      setSuccess("Profile changes saved!");
    } catch (error) {
      setError(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold mb-4">Profile Information</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={previewImage || profileData.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg"
        />
        <div className="flex flex-col items-center">
          <label className="cursor-pointer text-blue-600 text-sm flex items-center">
            <FiUpload className="mr-1" />
            <span>Change Photo</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {previewImage && (
            <button
              className="mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={uploadAvatar}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Save Photo'}
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto space-y-4">
        {/* First Name Field */}
        <div>
          <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleProfileChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleProfileChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300'}`}
            disabled
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className={`block mb-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
          <div className={`flex items-center border rounded-lg px-4 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
            <span className="mr-2">🇳🇬</span>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleProfileChange}
              className={`w-full focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : ''}`}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition mt-6"
          onClick={saveProfileChanges}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </>
  );
};

export default ProfileForm;