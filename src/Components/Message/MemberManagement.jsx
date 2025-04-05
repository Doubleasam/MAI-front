import React, { useState } from 'react';
import { FiX, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import useGroupStore from '../../Store/group';

const MemberManagement = ({ onBack }) => {
  const { currentGroup } = useGroupStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMemberSelection = (memberId) => {
    if (!currentGroup.isAdmin) {
      alert('Only admins can select members.');
      return;
    }
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Adjusted member filtering and mapping
  const filteredMembers = currentGroup?.members?.filter((member) =>
    member?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-medium">Member Management</h2>
        <div />
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search members..."
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Member List */}
      <div className="space-y-4">
        {filteredMembers?.map((member) => (
          <div
            key={member._id}
            onClick={() => toggleMemberSelection(member._id)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
              selectedMembers.includes(member._id)
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${member.user.email.split('@')[0]}&background=random`}
                alt={member.user.email}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              />
              {/* Removed role check since it's not in your data */}
              {selectedMembers.includes(member._id) && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                  <FiCheck size={12} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{member.user.email.split('@')[0]}</p>
              <p className="text-sm text-gray-500">
                Member {/* Default to Member since role isn't in your data */}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Members */}
      <div className="mt-4">
        <h4 className="font-medium mb-2">Selected Members:</h4>
        <div className="flex flex-wrap gap-2">
          {selectedMembers.map((memberId) => {
            const member = currentGroup.members.find((m) => m._id === memberId);
            return (
              <div key={memberId} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <span className="mr-2">{member?.user?.email.split('@')[0] || 'Unknown'}</span>
                <button
                  onClick={() => toggleMemberSelection(memberId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiX size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MemberManagement;