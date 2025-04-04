import React, { useEffect } from 'react';
import { FiEye, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useGroupStore from '../Store/group';
import useAuthStore from '../Store/Auth';

const GroupListTable = () => {
  const {
    groups = [],
    loading,
    error,
    successMessage,
    fetchUserGroups,
    clearError,
    clearSuccessMessage,
    getGroupDetails,
    joinGroup, // Import joinGroup function
  } = useGroupStore();

  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    if (currentUser?._id) {
      fetchUserGroups();
    }
  }, [fetchUserGroups, currentUser]);

  const requestToJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId);
      alert('Join request sent successfully!');
    } catch (error) {
      console.error('Failed to send join request:', error);
    }
  };

  const AlertMessage = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 bg-${type}-100 border border-${type}-400 text-${type}-700 px-4 py-3 rounded z-20`}>
      <span className="block sm:inline">{message}</span>
      <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className={`fill-current h-6 w-6 text-${type}-500`} role="button" viewBox="0 0 20 20">
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4 relative">
      <Link 
        to="/groupCreation"
        className="fixed bottom-8 right-8 flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10"
      >
        <FiPlus className="h-6 w-6" />
      </Link>

      {error && <AlertMessage message={error} type="red" onClose={clearError} />}
      {successMessage && <AlertMessage message={successMessage} type="green" onClose={clearSuccessMessage} />}

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Savings Groups</h1>
          <p className="text-sm text-gray-600 mt-1">
            {groups.length} group{groups.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading groups...</p>
          </div>
        ) : groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Group Name</TableHeader>
                  <TableHeader>Members</TableHeader>
                  <TableHeader>Time Left</TableHeader>
                  <TableHeader>Progress</TableHeader>
                  <TableHeader align="right">Action</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groups.map((group) => (
                  <TableRow 
                    key={group._id} 
                    group={group} 
                    onJoinRequest={requestToJoinGroup} // Pass the function
                    currentUser={currentUser} 
                    calculateTimeLeft={calculateTimeLeft} 
                    getGroupDetails={getGroupDetails} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

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

const TableHeader = ({ children, align = "left" }) => (
  <th scope="col" className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
    {children}
  </th>
);

const TableRow = ({ group, onJoinRequest, currentUser, calculateTimeLeft, getGroupDetails }) => {
  const calculateProgress = (group) => {
    if (!group?.payoutOrder || !group?.members) return 0;
    const activeMembers = group.members.filter(member => member?.isActive) || [];
    const totalMembers = activeMembers.length;
    if (totalMembers === 0) return 0;
    const completed = group.currentPayoutIndex || 0;
    return Math.round((Math.min(completed, totalMembers) / totalMembers) * 100);
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img 
            className="h-10 w-10 rounded-full" 
            src={group.image || 'https://randomuser.me/api/portraits/med/women/65.jpg'} 
            alt={group.name} 
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{group.name}</div>
            <div className="text-sm text-gray-500">
              ${group.savingsAmount * (group.members?.filter(m => m.isActive).length || 0)}
            </div>
            {group.admin?._id === currentUser?._id && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Admin
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {group.members?.filter(m => m.isActive).length || 0}/{group.maxMembers || 15}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {calculateTimeLeft(group.nextPayoutDate)}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <ProgressBar progress={calculateProgress(group)} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <GroupActions 
          group={group} 
          onJoinRequest={onJoinRequest} 
          currentUser={currentUser} 
          getGroupDetails={getGroupDetails} 
        />
      </td>
    </tr>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="flex items-center">
    <div className="w-32 mr-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
    <span className="text-sm font-medium text-gray-700">{progress}%</span>
  </div>
);

const GroupActions = ({ group, onJoinRequest, currentUser, getGroupDetails }) => {
  const isMember = group.members?.some(
    member => member.user?._id === currentUser?._id && member.isActive
  );

  const hasPendingRequest = group.joinRequests?.some(
    request => request.user?._id === currentUser?._id && request.status === 'pending'
  );

  if (isMember) {
    return (
      <Link 
        to={`/chat/${group._id}`} 
        className="inline-flex items-center text-blue-600 hover:text-blue-900"
        onClick={() => getGroupDetails(group._id)}
      >
        <FiEye className="mr-1" /> View
      </Link>
    );
  }

  if (hasPendingRequest) {
    return (
      <span className="inline-flex items-center text-gray-500 cursor-not-allowed">
        <FiPlus className="mr-1" /> Requested
      </span>
    );
  }

  return (
    <button
      onClick={() => onJoinRequest(group._id)}
      className="inline-flex items-center text-blue-600 hover:text-blue-900"
    >
      <FiPlus className="mr-1" /> Join
    </button>
  );
};

const EmptyState = () => (
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
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <FiPlus className="-ml-1 mr-2 h-5 w-5" />
        New Group
      </Link>
    </div>
  </div>
);

export default GroupListTable;