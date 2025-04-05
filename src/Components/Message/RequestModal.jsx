import React from 'react';
import { FiX } from 'react-icons/fi';

const RequestModal = ({ showRequestModal, setShowRequestModal, selectedUsers, requestMessage, setRequestMessage, confirmSendRequest }) => {
  return (
    showRequestModal && (
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
    )
  );
};

export default RequestModal;
