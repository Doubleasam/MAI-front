import React, { useState } from 'react';
import { FiMoreVertical, FiLink, FiUsers, FiBell, FiX, FiCheck } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import useGroupStore from '../../Store/group';
import useWalletStore from '../../Store/useWalletStore';
import MemberManagement from '../Message/MemberManagement'; // Import the new component

const RecentActivity = () => {
  // Zustand state
  const { 
    currentGroup,
    leaveGroup,
    fetchGroupMessages,
    changeMemberRole,
    updateGroupSettings
  } = useGroupStore();
  
  const { contributeToGroup } = useWalletStore();
  
  // Local state
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showPaymentOrderModal, setShowPaymentOrderModal] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState([]);
  const [showMemberManagement, setShowMemberManagement] = useState(false); // New state for member management

  const toggleMembersModal = () => {
    setShowMembersModal(!showMembersModal);
  };

  const toggleMembersList = () => {
    setShowMembersList(!showMembersList);
    if (!showMembersList) {
      setSelectedMembers([]);
    }
  };

  const toggleMemberSelection = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId) 
        : [...prev, memberId]
    );
  };

  const handleSendRequest = () => {
    console.log("Sending request to:", selectedMembers);
    setSelectedMembers([]);
    alert(`Request sent to ${selectedMembers.length} members`);
  };

  const handleAssignPaymentOrder = () => {
    if (selectedMembers.length === 0) {
      alert("Please select at least one member");
      return;
    }
    setShowPaymentOrderModal(true);
  };

  const confirmPaymentOrder = async () => {
    try {
      await updateGroupSettings(currentGroup._id, { 
        payoutOrder: [...currentGroup.payoutOrder, ...paymentOrder] 
      });
      setShowPaymentOrderModal(false);
      setPaymentOrder([]);
      alert("Payment order updated successfully");
    } catch (error) {
      console.error("Failed to update payment order:", error);
      alert("Failed to update payment order");
    }
  };

  const handleMakeContribution = async () => {
    if (!contributionAmount || isNaN(contributionAmount) || !currentGroup?._id) return;
    try {
      await contributeToGroup(currentGroup._id, parseFloat(contributionAmount));
      await fetchGroupMessages(currentGroup._id);
      setContributionAmount('');
    } catch (error) {
      console.error('Failed to make contribution:', error);
    }
  };

  const copyGroupLink = () => {
    if (!currentGroup?._id) return;
    navigator.clipboard.writeText(`${window.location.origin}/groups/${currentGroup._id}/join`);
    alert('Group link copied to clipboard!');
  };

  return (
    <div className="p-4 space-y-4">
      {showMemberManagement ? (
        <MemberManagement onBack={() => setShowMemberManagement(false)} />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Group Setup</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <FiMoreVertical size={20} />
            </button>
          </div>

          {/* Group Image */}
          <div className="flex justify-center">
            <img
              src={currentGroup?.image || "https://randomuser.me/api/portraits/women/65.jpg"}
              alt="Group"
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>

          {/* Group Name */}
          <h3 className="text-center font-semibold">{currentGroup?.name || 'Loading...'}</h3>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <button 
              onClick={() => setShowMemberManagement(true)} // Navigate to member management
              className="flex flex-col items-center bg-gray-100 p-2 rounded hover:bg-gray-200 transition"
            >
              <FiUsers className="text-gray-700" size={18} />
              <span className="text-xs mt-1">Members</span>
            </button>
            <button 
              onClick={() => currentGroup?._id && leaveGroup(currentGroup._id)}
              className="flex flex-col items-center bg-gray-100 p-2 rounded hover:bg-gray-200 transition"
            >
              <span className="text-gray-700 text-lg">↩️</span>
              <span className="text-xs mt-1">Leave</span>
            </button>
            <button 
              onClick={copyGroupLink}
              className="flex flex-col items-center bg-gray-100 p-2 rounded hover:bg-gray-200 transition"
            >
              <FiLink className="text-gray-700" size={18} />
              <span className="text-xs mt-1">Link</span>
            </button>
            <button className="flex flex-col items-center bg-gray-100 p-2 rounded hover:bg-gray-200 transition">
              <span className="text-gray-700 text-lg">⋯</span>
              <span className="text-xs mt-1">More</span>
            </button>
          </div>

          {/* Conditional Rendering for Recent Activity or Members List */}
          {showMembersList ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Group Members</h4>
                {selectedMembers.length > 0 && (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSendRequest}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Send Request
                    </button>
                    {currentGroup?.isAdmin && (
                      <button 
                        onClick={handleAssignPaymentOrder}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Assign Payment
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {currentGroup?.members?.map((member) => (
                  <div 
                    key={member._id} 
                    onClick={() => toggleMemberSelection(member._id)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${selectedMembers.includes(member._id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                  >
                    <div className="relative">
                      <img
                        src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      {member.role === 'admin' && (
                        <FaCrown className="absolute -bottom-1 -right-1 text-yellow-500 bg-white rounded-full p-1" size={16} />
                      )}
                      {selectedMembers.includes(member._id) && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                          <FiCheck size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {member.role === 'admin' ? 'Admin' : 
                         member.role === 'moderator' ? 'Moderator' : 'Member'}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status === 'active' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-4">
                {currentGroup?.activities?.slice(0, 3).map((activity) => (
                  <div key={activity._id} className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FiBell className="text-blue-600" size={12} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.text}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Order Modal */}
          {showPaymentOrderModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Assign Payment Order</h3>
                  <button 
                    onClick={() => setShowPaymentOrderModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Selected Members:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map(memberId => {
                      const member = currentGroup.members.find(m => m._id === memberId);
                      return (
                        <div key={memberId} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <span className="mr-2">{member?.name || 'Unknown'}</span>
                          <button 
                            onClick={() => setPaymentOrder(prev => [...prev, memberId])}
                            className="text-green-500 hover:text-green-700"
                          >
                            <FiCheck size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Payment Order:</h4>
                  <div className="space-y-2">
                    {paymentOrder.length === 0 ? (
                      <p className="text-gray-500">No members added yet</p>
                    ) : (
                      paymentOrder.map((memberId, index) => {
                        const member = currentGroup.members.find(m => m._id === memberId);
                        return (
                          <div key={memberId} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded">
                            <div>
                              <span className="font-medium">{index + 1}.</span> {member?.name || 'Unknown'}
                            </div>
                            <button 
                              onClick={() => setPaymentOrder(prev => prev.filter(id => id !== memberId))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowPaymentOrderModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPaymentOrder}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Button (only show for admin) */}
          {currentGroup?.isAdmin && (
            <button className="w-full bg-red-100 text-red-600 font-medium py-2 rounded hover:bg-red-200 transition">
              Delete Group
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RecentActivity;