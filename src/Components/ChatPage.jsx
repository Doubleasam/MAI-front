import React, { useState } from 'react';
import { 
  FiMoreVertical, 
  FiBell, 
  FiPaperclip, 
  FiMic, 
  FiSend, 
  FiChevronDown, 
  FiLink, 
  FiSearch,
  FiUser,
  FiCopy,
  FiLogOut,
  FiUserPlus,
  FiCheck,
  FiX,
  FiShield,
  FiUserCheck,
  FiSettings
} from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Jane Cooper', text: 'Has everyone made their contribution this week?', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'You', text: 'Yes, I just sent mine', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'Alex Morgan', text: 'I\'ll do it by tomorrow', time: '10:35 AM', isMe: false },
    { id: 4, sender: 'You', text: 'Great! We\'re at 85% of our goal already', time: '10:36 AM', isMe: true },
    { id: 5, sender: 'Sam Wilson', text: 'That\'s amazing progress!', time: '10:38 AM', isMe: false },
  ]);

  const [members, setMembers] = useState([
    { id: 1, name: 'Jane Cooper', online: true, lastActive: 'Now', status: 'member', role: 'admin' },
    { id: 2, name: 'Alex Morgan', online: true, lastActive: '2 min ago', status: 'member', role: 'moderator' },
    { id: 3, name: 'Sam Wilson', online: false, lastActive: '30 min ago', status: 'member', role: 'member' },
    { id: 4, name: 'Taylor Swift', online: false, lastActive: '1 hour ago', status: 'non-member', role: '' },
    { id: 5, name: 'Chris Evans', online: true, lastActive: '5 min ago', status: 'non-member', role: '' },
    { id: 6, name: 'Emma Watson', online: false, lastActive: '2 hours ago', status: 'pending', role: '' },
    { id: 7, name: 'Robert Downey', online: false, lastActive: '1 day ago', status: 'non-member', role: '' },
    { id: 8, name: 'Scarlett Johansson', online: true, lastActive: 'Now', status: 'member', role: 'member' },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, text: 'Jane Cooper made a contribution of $200', time: '10:25 AM' },
    { id: 2, text: 'Alex Morgan joined the group', time: 'Yesterday' },
    { id: 3, text: 'Group savings goal increased to $5,000', time: '2 days ago' },
  ]);

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showMembersList, setShowMembersList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState('member'); // Simulate current user's role

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const copyGroupLink = () => {
    navigator.clipboard.writeText('https://family-savings-group.example.com');
    alert('Group link copied to clipboard!');
    setShowMoreOptions(false);
  };

  const toggleMembersList = () => {
    setShowMembersList(!showMembersList);
    if (!showMembersList) {
      setSearchTerm('');
      setSelectedUsers([]);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const sendRequestToSelectedUsers = () => {
    if (selectedUsers.length === 0) return;
    setShowRequestModal(true);
  };

  const confirmSendRequest = () => {
    // Update member statuses (for demo purposes)
    setMembers(members.map(member => 
      selectedUsers.includes(member.id) && member.status === 'non-member' 
        ? { ...member, status: 'pending' } 
        : member
    ));
    
    // Add activity notification
    const newActivity = {
      id: activities.length + 1,
      text: `You sent group invitations to ${selectedUsers.length} ${selectedUsers.length > 1 ? 'members' : 'member'}`,
      time: 'Just now'
    };
    setActivities([newActivity, ...activities]);
    
    // Reset state
    setSelectedUsers([]);
    setRequestMessage('');
    setShowRequestModal(false);
  };

  const changeUserRole = (userId, newRole) => {
    setMembers(members.map(member => 
      member.id === userId 
        ? { ...member, role: newRole } 
        : member
    ));
    setShowRoleMenu(null);
    
    // Add activity notification
    const user = members.find(m => m.id === userId);
    const newActivity = {
      id: activities.length + 1,
      text: `You changed ${user.name}'s role to ${newRole}`,
      time: 'Just now'
    };
    setActivities([newActivity, ...activities]);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'member':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Member</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Non-member</span>;
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FiCrown className="mr-1" size={12} /> Admin
          </span>
        );
      case 'moderator':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FiShield className="mr-1" size={12} /> Moderator
          </span>
        );
      case 'member':
        return (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FiUserCheck className="mr-1" size={12} /> Member
          </span>
        );
      default:
        return null;
    }
  };

  const canChangeRoles = currentUserRole === 'admin' || currentUserRole === 'moderator';

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="https://randomuser.me/api/portraits/women/65.jpg" 
                alt="Group" 
                className="w-10 h-10 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-semibold">Family Savings Group</h2>
              <p className="text-xs text-gray-500">3 members online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative">
            <button className="text-gray-500 hover:text-gray-700">
              <FiBell size={20} />
            </button>
            <div className="relative">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
                <FiMoreVertical size={20} />
              </button>
              {showMoreOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={copyGroupLink}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FiLink className="mr-2" />
                    Copy Group Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-4 flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.isMe ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                {!msg.isMe && (
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold text-sm">{msg.sender}</div>
                    {msg.sender === 'Jane Cooper' && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        <FiCrown className="inline mr-1" size={10} /> Admin
                      </span>
                    )}
                    {msg.sender === 'Alex Morgan' && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        <FiShield className="inline mr-1" size={10} /> Moderator
                      </span>
                    )}
                  </div>
                )}
                <div className="text-sm">{msg.text}</div>
                <div className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 mr-2">
              <FiPaperclip size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="text-gray-500 hover:text-gray-700 ml-2">
              <FiMic size={20} />
            </button>
            <button 
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-white border-l border-gray-200 hidden md:block overflow-y-auto">
        {/* Group Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative">
              <img 
                src="https://randomuser.me/api/portraits/women/65.jpg" 
                alt="Group" 
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Family Savings</h2>
              <p className="text-xs text-gray-500">Created: Jan 15, 2023</p>
              {currentUserRole === 'admin' && (
                <span className="inline-block mt-1 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                  <FiCrown className="inline mr-1" size={10} /> Group Admin
                </span>
              )}
              {currentUserRole === 'moderator' && (
                <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  <FiShield className="inline mr-1" size={10} /> Moderator
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 text-red-500 text-sm py-2 border border-red-100 rounded-lg hover:bg-red-50 transition flex items-center justify-center">
              <FiLogOut className="mr-1" size={14} /> Leave
            </button>
            <button 
              onClick={copyGroupLink}
              className="flex-1 text-blue-500 text-sm py-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition flex items-center justify-center"
            >
              <FiCopy className="mr-1" size={14} /> Copy Link
            </button>
          </div>
        </div>

        {/* Members Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Members</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {members.filter(m => m.status === 'member').length}/10
              </span>
              <button 
                onClick={toggleMembersList}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiUser size={18} />
              </button>
            </div>
          </div>
          
          {/* Members List with Search */}
          {showMembersList && (
            <div className="mb-4">
              <div className="relative mb-3">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search members..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              
              {selectedUsers.length > 0 && (
                <div className="mb-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {selectedUsers.length} {selectedUsers.length > 1 ? 'users' : 'user'} selected
                  </span>
                  <button
                    onClick={sendRequestToSelectedUsers}
                    className="flex items-center text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    <FiUserPlus className="mr-1" size={14} /> Send Request
                  </button>
                </div>
              )}
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredMembers.map((member) => (
                  <div 
                    key={member.id} 
                    className={`flex items-center justify-between p-2 rounded-lg ${selectedUsers.includes(member.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      {member.status === 'non-member' && (
                        <button 
                          onClick={() => toggleUserSelection(member.id)}
                          className={`w-5 h-5 rounded border ${selectedUsers.includes(member.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}
                        >
                          {selectedUsers.includes(member.id) && <FiCheck size={14} className="mx-auto" />}
                        </button>
                      )}
                      <div className="relative">
                        <img 
                          src={`https://randomuser.me/api/portraits/${member.id % 2 === 0 ? 'men' : 'women'}/${member.id}0.jpg`}
                          alt={member.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {member.online && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{member.name}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500 truncate">
                            {member.online ? 'Online' : `Last seen ${member.lastActive}`}
                          </p>
                          {getStatusBadge(member.status)}
                          {member.role && getRoleBadge(member.role)}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {member.status === 'member' && canChangeRoles && (
                        <div className="relative">
                          <button 
                            onClick={() => setShowRoleMenu(showRoleMenu === member.id ? null : member.id)}
                            className="text-gray-400 hover:text-blue-500"
                          >
                            <FiSettings size={16} />
                          </button>
                          {showRoleMenu === member.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                              <button
                                onClick={() => changeUserRole(member.id, 'admin')}
                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiCrown className="mr-2 text-purple-500" size={14} /> Make Admin
                              </button>
                              <button
                                onClick={() => changeUserRole(member.id, 'moderator')}
                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiShield className="mr-2 text-blue-500" size={14} /> Make Moderator
                              </button>
                              <button
                                onClick={() => changeUserRole(member.id, 'member')}
                                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FiUserCheck className="mr-2 text-gray-500" size={14} /> Make Member
                              </button>
                              {member.role === 'admin' && currentUserRole === 'admin' && (
                                <button
                                  onClick={() => changeUserRole(member.id, '')}
                                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left border-t border-gray-200"
                                >
                                  <FiX className="mr-2" size={14} /> Remove Admin
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      <button className="text-gray-400 hover:text-blue-500">
                        <FiCopy size={16} />
                      </button>
                      {member.status === 'non-member' && (
                        <button 
                          onClick={() => toggleUserSelection(member.id)}
                          className="text-gray-400 hover:text-green-500"
                        >
                          <FiUserPlus size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Member Icons Grid (shown when search is not active) */}
          {!showMembersList && (
            <>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {members.filter(m => m.status === 'member').slice(0, 10).map((member) => (
                  <div key={member.id} className="relative flex flex-col items-center">
                    <img 
                      src={`https://randomuser.me/api/portraits/${member.id % 2 === 0 ? 'men' : 'women'}/${member.id}0.jpg`}
                      alt={member.name}
                      className="w-10 h-10 rounded-full mb-1"
                    />
                    {member.online && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                    )}
                    <span className="text-xs text-gray-600 truncate w-full text-center">{member.name.split(' ')[0]}</span>
                    {member.role === 'admin' && (
                      <FiCrown className="absolute -top-1 -right-1 text-purple-500 bg-white rounded-full p-0.5" size={12} />
                    )}
                    {member.role === 'moderator' && (
                      <FiShield className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full p-0.5" size={12} />
                    )}
                  </div>
                ))}
                {/* Empty slots */}
                {Array.from({length: 10 - members.filter(m => m.status === 'member').length}).map((_, i) => (
                  <div key={`empty-${i}`} className="w-10 h-10 rounded-full bg-gray-100 border-2 border-dashed border-gray-300"></div>
                ))}
              </div>
              
              <button 
                onClick={toggleMembersList}
                className="text-blue-500 text-sm hover:text-blue-700 flex items-center"
              >
                <span>View all members</span>
                <FiChevronDown className="ml-1" size={14} />
              </button>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Recent Activity</h3>
            <div className="relative">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
                <FiMoreVertical size={16} />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="bg-blue-100 p-1 rounded-full mr-3">
                  <FiBell className="text-blue-600" size={12} />
                </div>
                <div>
                  <p className="text-sm text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="text-blue-500 text-sm mt-3 hover:text-blue-700 flex items-center">
            <span>Show more activity</span>
            <FiChevronDown className="ml-1" size={14} />
          </button>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Send Group Invitation</h3>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                You're inviting {selectedUsers.length} {selectedUsers.length > 1 ? 'people' : 'person'} to join this group.
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Add a personal message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows="3"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendRequest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;