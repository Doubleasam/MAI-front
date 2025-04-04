import React, { useState } from 'react';
import { FiArrowLeft, FiShare2, FiCopy, FiUserPlus, FiUpload, FiX } from 'react-icons/fi';
import useGroupStore from '../Store/group';
import {useNavigate} from 'react-router-dom';
import axios from '../Api/axios';
const GroupCreationFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    profilePicture: null,
    frequency: 'weekly',
    memberLimit: 10,
    payoutDate: '1',
    amount: '50',
    inviteCode: 'GRP-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    members: []
  });
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');

  const { createGroup, loading } = useGroupStore();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('Image size must be less than 5MB');
      return;
    }

    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);

    // Store file for upload
    setGroupData(prev => ({
      ...prev,
      profilePicture: file
    }));
  };
  const removeImage = () => {
    setPreviewImage('');
    setGroupData(prev => ({
      ...prev,
      profilePicture: null
    }));
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(groupData.inviteCode);
    alert('Group code copied to clipboard!');
  };

  const shareLink = () => {
    const link = `http://groupsave.com/join/${groupData.inviteCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join my savings group',
        text: 'Join my savings group on GroupSave',
        url: link
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(link);
      alert('Group link copied to clipboard!');
    }
  };

  const handleCreateGroup = async () => {
    try {
      setError('');
  
      const formData = new FormData();
      formData.append('name', groupData.name);
      formData.append('description', groupData.description || '');
      formData.append('savingsAmount', groupData.amount);
      formData.append('frequency', groupData.frequency);
      formData.append('maxMembers', groupData.memberLimit);
      formData.append('privacy', 'public'); // Default to public
      formData.append('inviteCode', groupData.inviteCode);
      
      if (groupData.profilePicture) {
        formData.append('image', groupData.profilePicture);
      }
  
      const response = await axios.post('/api/group/createGroup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.data.success) {
        setCurrentStep(5); // Show success step
      } else {
        setError(response.data.message || 'Failed to create group');
      }
    } catch (err) {
      console.error('Create group error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to create group. Please try again.'
      );
    }
  };

  // Step 1: Create or Join Group
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Create New Saving's Group</h1>
          <p className="text-gray-600 text-center mb-8">
            You are about to Join or Create a new group. Select either of the buttons to begin your journey.
          </p>

          <div className="space-y-4">
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setCurrentStep(2)}
            >
              Create Group
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition">
              Join Existing Group
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Create Group Basic Info
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Create Group</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Your new group where you and your friends can start saving.
          </p>

          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Group preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                <FiUpload />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
            <input
              type="text"
              name="name"
              value={groupData.name}
              onChange={handleInputChange}
              placeholder="Group Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-3"
              required
            />
            <textarea
              name="description"
              value={groupData.description}
              onChange={handleInputChange}
              placeholder="Group Description (optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              rows="3"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={!groupData.name}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Group Settings
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-5">
          <div className="flex items-center mb-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Group Settings</h1>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Configure your new savings group
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Savings Frequency</label>
              <select
                name="frequency"
                value={groupData.frequency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-200"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Member Limit</label>
              <input
                type="number"
                name="memberLimit"
                value={groupData.memberLimit}
                onChange={handleInputChange}
                min="2"
                max="20"
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Payout Date</label>
              <select
                name="payoutDate"
                value={groupData.payoutDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-200"
              >
                {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Amount per Member</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">$</span>
                <input
                  type="number"
                  name="amount"
                  value={groupData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full pl-8 px-3 py-2 text-sm border rounded-lg focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-2 rounded-lg text-xs">
              <p className="text-blue-800">
                Suggested: <span className="font-bold">$50</span> (based on similar groups)
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 text-sm rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="flex-1 bg-blue-500 text-white py-2 text-sm rounded-lg hover:bg-blue-600 transition"
              disabled={!groupData.amount}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Add Group Members
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentStep(3)}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Add Group Members</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Copy your group code and share amongst friends to join.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono font-bold">{groupData.inviteCode}</span>
              <button
                onClick={copyToClipboard}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FiCopy className="mr-1" /> Copy
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">Group Link:</p>
            <div className="flex items-center">
              <span className="text-blue-500 truncate mr-2">
                http://groupsave.com/join/{groupData.inviteCode}
              </span>
              <button
                onClick={shareLink}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FiShare2 className="mr-1" /> Share
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                  <FiUserPlus />
                </div>
                <span>You</span>
              </div>
              <span className="text-sm text-gray-500">Admin</span>
            </div>

            {groupData.members.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No members yet. Share the code to invite friends!
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              onClick={handleCreateGroup}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Creating Group...' : 'Create Group'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Success confirmation
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Group Created Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Your new group "{groupData.name}" is ready. Start inviting members and begin saving together.
          </p>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => {
              // Navigate to the group page
              window.location.href = `/groups/${groupData.inviteCode}`;
            }}
          >
            Go to Group
          </button>
        </div>
      </div>
    );
  }
};

export default GroupCreationFlow;