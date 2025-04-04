import React, { useEffect } from 'react';
import { FiEye, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useGroupStore from '../Store/group';

const GroupListTable = () => {
  const {
    groups = [],
    loading,
    error,
    successMessage,
    fetchUserGroups,
    clearError,
    clearSuccessMessage,
    requestToJoinGroup,
    user
  } = useGroupStore();

  useEffect(() => {
    fetchUserGroups();
  }, [fetchUserGroups]);

  // Check if user is a member of a group
  const isMember = (group) => {
    return group.members?.some(member => 
      member.user?._id?.toString() === user?._id?.toString() && member.isActive
    );
  };

  // Check if user has pending request
  const hasPendingRequest = (group) => {
    return group.joinRequests?.some(request => 
      request.user?._id?.toString() === user?._id?.toString() && request.status === 'pending'
    );
  };

  // Handle join request
  const handleJoinRequest = async (groupId) => {
    await requestToJoinGroup(groupId);
    fetchUserGroups(); // Refresh the list after request
  };

  // Helper function to calculate time left until next payout
  function calculateTimeLeft(payoutDate) {
    if (!payoutDate) return 'N/A';
    try {
      const now = new Date();
      const payout = new Date(payoutDate);
      const diff = payout - now;
      
      if (diff < 0) return 'Completed';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } catch (e) {
      return 'N/A';
    }
  }

  // Helper function to calculate progress percentage
  function calculateProgress(group) {
    if (!group?.payoutOrder || !group?.members) return 0;
    const activeMembers = group.members.filter(member => member.isActive);
    const totalMembers = activeMembers.length;
    if (totalMembers === 0) return 0;
    const completed = group.currentPayoutIndex || 0;
    return Math.round((completed / totalMembers) * 100);
  }

  // Safely handle groups data
  const safeGroups = Array.isArray(groups) ? groups : [];

  // Format groups data for display
  const formattedGroups = safeGroups.map(group => {
    // Calculate active members count
    const activeMembers = group.members?.filter(member => member.isActive) || [];
    const activeMemberCount = activeMembers.length;
    
    return {
      id: group._id,
      name: group.name || 'Unnamed Group',
      image: group.image || 'https://randomuser.me/api/portraits/med/women/65.jpg',
      members: `${activeMemberCount}/${group.maxMembers || 15}`,
      timeLeft: calculateTimeLeft(group.nextPayoutDate),
      progress: calculateProgress(group),
      amount: `$${(group.savingsAmount || 0) * activeMemberCount}`,
      isAdmin: group.admin?.toString() === user?._id?.toString(),
      isMember: isMember(group),
      hasPendingRequest: hasPendingRequest(group)
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 md:p-2 relative">
      {/* Floating Create Group Button */}
      <Link 
        to="/groupCreation"
        className="fixed bottom-8 right-8 flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
      >
        <FiPlus className="h-6 w-6" />
      </Link>

      {/* Display error message */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-20">
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={clearError}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Display success message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-20">
          <span className="block sm:inline">{successMessage}</span>
          <button 
            onClick={clearSuccessMessage}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Savings Groups</h1>
          <p className="text-sm text-gray-600 mt-1">
            {safeGroups.length} group{safeGroups.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Left
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formattedGroups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 transition">
                  {/* Group Name with Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={group.image} alt={group.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.amount}</div>
                        {group.isAdmin && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Members */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{group.members}</div>
                  </td>

                  {/* Time Left */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {group.timeLeft}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-32 mr-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{group.progress}%</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {group.isMember ? (
                      <Link 
                        to={`/groups/${group.id}/chat`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEye className="inline mr-1" /> Chat
                      </Link>
                    ) : group.hasPendingRequest ? (
                      <span className="text-yellow-600 mr-4">
                        Request Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => handleJoinRequest(group.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEye className="inline mr-1" /> Request to Join
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading groups...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && safeGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No groups found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new savings group.
            </p>
            <div className="mt-6">
              <Link
                to="/groupCreation"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                New Group
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupListTable;