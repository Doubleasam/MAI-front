import React, { useState, useEffect } from 'react';
import ChatHeader from '../Components/Message/ChatHeader';
import MessageList from '../Components/Message/MessageList';
import MessageInput from '../Components/Message/MessageInput';
import MembersList from '../Components/Message/MembersList';
import RecentActivity from '../Components/Message/RecentActivity';
import RequestModal from '../Components/Message/RequestModal';
import useAuthStore from '../Store/Auth';
import useGroupStore from '../Store/group';
import useWalletStore from '../Store/useWalletStore';
import { FaCrown } from 'react-icons/fa';
import { FiShield, FiUserCheck } from 'react-icons/fi';

const ChatPage = ({ groupId }) => {
  // State from stores
  const { user: currentUser } = useAuthStore();
  const {
    currentGroup,
    groupMessages,
    fetchGroupMessages,
    sendMessage,
    joinGroup,
    leaveGroup,
    addGroupMembers,
    removeGroupMember,
    changeMemberRole,
    fetchGroupDetails
  } = useGroupStore();
  const { contributeToGroup } = useWalletStore();
useEffect(() => {
  console.log("sending group id",currentGroup.id);
  fetchGroupMessages(currentGroup._id);
},[groupId, fetchGroupDetails, fetchGroupMessages]);
  // Local state
  const [message, setMessage] = useState('');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(null);
  const [contributionAmount, setContributionAmount] = useState('');

  // Helper functions
  const calculateTimeLeft = (payoutDate) => {
    if (!payoutDate) return 'N/A';
    const now = new Date();
    const payout = new Date(payoutDate);
    const diff = payout - now;
    if (diff < 0) return 'Completed';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  const calculateProgress = (group) => {
    if (!group?.payoutOrder || !group?.members) return 0;
    const activeMembers = group.members.filter(member => member?.isActive) || [];
    const totalMembers = activeMembers.length;
    if (totalMembers === 0) return 0;
    const completed = group.currentPayoutIndex || 0;
    return Math.round((Math.min(completed, totalMembers) / totalMembers) * 100);
  };

  // Fetch group data on mount
  useEffect(() => {
    if (groupId ) {
      console.log("fetch groupId",groupId);
      fetchGroupDetails(groupId);
      fetchGroupMessages(groupId);
    }
  }, [groupId, groupMessages,fetchGroupDetails, fetchGroupMessages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (message.trim() && currentGroup?._id) {
      try {
        console.log(`Sending message to groupId: ${currentGroup._id}, message: ${message}`);
        await sendMessage(currentGroup._id, message);
        setMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  // Handle making a contribution
  const handleMakeContribution = async () => {
    if (!contributionAmount || isNaN(contributionAmount)) return;
    try {
      await contributeToGroup(groupId, parseFloat(contributionAmount));
      await sendMessage(
        groupId,
        `I just made a contribution of $${contributionAmount} to the group savings.`
      );
      setContributionAmount('');
    } catch (error) {
      console.error('Failed to make contribution:', error);
    }
  };

  // Copy group link to clipboard
  const copyGroupLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/groups/${groupId}/join`);
    alert('Group link copied to clipboard!');
    setShowMoreOptions(false);
  };

  // Toggle members list visibility
  const toggleMembersList = () => {
    setShowMembersList(!showMembersList);
    if (!showMembersList) {
      setSearchTerm('');
      setSelectedUsers([]);
    }
  };

  // Toggle user selection for invitation
  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Send request to selected users
  const sendRequestToSelectedUsers = () => {
    if (selectedUsers.length === 0) return;
    setShowRequestModal(true);
  };

  // Confirm sending invitations
  const confirmSendRequest = async () => {
    try {
      await addGroupMembers(groupId, selectedUsers);
      await sendMessage(
        groupId,
        `Sent group invitations to ${selectedUsers.length} ${selectedUsers.length > 1 ? 'people' : 'person'}.`
      );
      setSelectedUsers([]);
      setRequestMessage('');
      setShowRequestModal(false);
    } catch (error) {
      console.error('Failed to send invitations:', error);
    }
  };

  // Change user role
  const changeUserRole = async (userId, newRole) => {
    try {
      await changeMemberRole(groupId, userId, newRole);
      setShowRoleMenu(null);
    } catch (error) {
      console.error('Failed to change role:', error);
    }
  };

  // Get status badge
  const getStatusBadge = (member) => {
    if (member.status === 'pending') {
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
    }
    return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Member</span>;
  };

  // Get role badge
  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FaCrown className="mr-1" size={12} /> Admin
          </span>
        );
      case 'moderator':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FiShield className="mr-1" size={12} /> Moderator
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FiUserCheck className="mr-1" size={12} /> Member
          </span>
        );
    }
  };

  // Check if current user can change roles
  const canChangeRoles = currentGroup?.isAdmin ||
    (currentGroup?.members?.find(m => m._id === currentUser?._id)?.role === 'moderator');

  // Check if current user is admin
  const isAdmin = currentGroup?.isAdmin;
console.log("group message",groupMessages);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader 
          currentGroup={currentGroup} 
          showMoreOptions={showMoreOptions} 
          setShowMoreOptions={setShowMoreOptions} 
          copyGroupLink={copyGroupLink} 
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <MessageList 
            groupMessages={groupMessages} 
            currentUser={currentUser} 
          />
        </div>

        {/* Message Input */}
        <MessageInput 
          message={message} 
          setMessage={setMessage} 
          handleSendMessage={handleSendMessage} 
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-white border-l border-gray-200 hidden md:block overflow-y-auto">
        <MembersList 
          currentGroup={currentGroup} 
          showMembersList={showMembersList} 
          toggleMembersList={toggleMembersList} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedUsers={selectedUsers} 
          toggleUserSelection={toggleUserSelection} 
          sendRequestToSelectedUsers={sendRequestToSelectedUsers} 
          showRoleMenu={showRoleMenu} 
          setShowRoleMenu={setShowRoleMenu} 
          changeUserRole={changeUserRole} 
          canChangeRoles={canChangeRoles} 
          isAdmin={isAdmin} 
          getStatusBadge={getStatusBadge} 
          getRoleBadge={getRoleBadge} 
        />

        {/* Recent Activity */}
        <RecentActivity 
          currentGroup={currentGroup} 
          showMoreOptions={showMoreOptions} 
          setShowMoreOptions={setShowMoreOptions} 
        />
      </div>

      {/* Request Modal */}
      <RequestModal 
        showRequestModal={showRequestModal} 
        setShowRequestModal={setShowRequestModal} 
        selectedUsers={selectedUsers} 
        requestMessage={requestMessage} 
        setRequestMessage={setRequestMessage} 
        confirmSendRequest={confirmSendRequest} 
      />
    </div>
  );
};

export default ChatPage;