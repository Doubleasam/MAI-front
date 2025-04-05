import React from 'react';
import { FiUser, FiUserPlus, FiCheck, FiSettings, FiCopy } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const MembersList = ({
  currentGroup,
  showMembersList,
  toggleMembersList,
  searchTerm,
  setSearchTerm,
  selectedUsers,
  toggleUserSelection,
  sendRequestToSelectedUsers,
  showRoleMenu,
  setShowRoleMenu,
  changeUserRole,
  canChangeRoles,
  isAdmin,
  getStatusBadge,
  getRoleBadge
}) => {
  const filteredMembers = currentGroup?.members?.filter(member =>
    member?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border-b border-gray-200">
      
      
      {showMembersList && currentGroup?.members && (
        <div className="mb-4">
          <div className="relative mb-3">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
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
                key={member._id} 
                className={`flex items-center justify-between p-2 rounded-lg ${selectedUsers.includes(member._id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => setShowRoleMenu(null)}
              >
                <div className="flex items-center space-x-3 flex-1">
                  {member.status === 'pending' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUserSelection(member._id);
                      }}
                      className={`w-5 h-5 rounded border ${selectedUsers.includes(member._id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}
                    >
                      {selectedUsers.includes(member._id) && <FiCheck size={14} className="mx-auto" />}
                    </button>
                  )}
                  <div className="relative">
                    <img 
                      src={member.avatar || `https://randomuser.me/api/portraits/${member._id % 2 === 0 ? 'men' : 'women'}/${member._id.slice(-2)}.jpg`}
                      alt={member.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {member.status === 'active' && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{member.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-gray-500 truncate">
                        {member.status === 'active' ? 'Online' : 'Offline'}
                      </p>
                      {getStatusBadge(member)}
                      {member.role && getRoleBadge(member.role)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {member.status === 'active' && canChangeRoles && (
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRoleMenu(showRoleMenu === member._id ? null : member._id);
                        }}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <FiSettings size={16} />
                      </button>
                      {showRoleMenu === member._id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              changeUserRole(member._id, 'admin');
                            }}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FaCrown className="mr-2 text-purple-500" size={14} /> Make Admin
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              changeUserRole(member._id, 'moderator');
                            }}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FiShield className="mr-2 text-blue-500" size={14} /> Make Moderator
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              changeUserRole(member._id, 'member');
                            }}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FiUserCheck className="mr-2 text-gray-500" size={14} /> Make Member
                          </button>
                          {member.role === 'admin' && isAdmin && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                changeUserRole(member._id, 'member');
                              }}
                              className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left border-t border-gray-200"
                            >
                              <FiX className="mr-2" size={14} /> Remove Admin
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(member._id);
                    }}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <FiCopy size={16} />
                  </button>
                  {member.status === 'pending' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUserSelection(member._id);
                      }}
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
    </div>
  );
};

export default MembersList;