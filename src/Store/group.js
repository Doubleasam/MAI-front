import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '../Api/axios';

const useGroupStore = create(
  persist(
    (set, get) => ({
      // State
      groups: [],
      currentGroup: null,
      groupMessages: {
        success: false,
        count: 0,
        data: []
      },
      payoutHistory: [],
      joinRequests: [],
      loading: false,
      error: null,
      successMessage: null,
      // Helper to clear messages
      _clearMessages: () => {
        setTimeout(() => set({ error: null, successMessage: null }), 5000);
      },

      // ==============================================
      //               GROUP MANAGEMENT
      // ==============================================

      createGroup: async (formData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/group/createGroup', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          set(state => ({
            groups: [...state.groups, response.data],
            currentGroup: response.data,
            loading: false,
            successMessage: 'Group created successfully'
          }));

          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to create group',
            loading: false
          });
          throw error;
        }
      },

      fetchUserGroups: async () => {
        set({ loading: true });
        try {
          const response = await axios.get('/api/group');
          set({
            groups: response.data.data,
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to fetch groups',
            loading: false
          });
          throw error;
        }
      },
      getGroupDetails: async (groupId) => {
        set({ loading: true });
        try {
          console.log(`Fetching group details for groupId: ${groupId}`);

          const response = await axios.get(`/api/group/${groupId}`);
          console.log('Group details response:', response.data);

          // Access the actual data within the response
          const groupData = response.data.data;

          // Ensure the response data is structured as expected
          if (groupData && groupData._id) {
            set({
              currentGroup: {
                ...groupData,
                nextPayoutAmount: groupData.savingsAmount * groupData.members.length,
                isAdmin: groupData.admin._id === get().user?._id
              },
              loading: false
            });

            // Log the updated state after a short delay to ensure it's updated
            setTimeout(() => {
              console.log('Updated currentGroup:', get().currentGroup);
            }, 100);
          } else {
            console.error('Unexpected response structure:', response.data);
            set({
              error: 'Unexpected response structure',
              loading: false
            });
          }

          return groupData;
        } catch (error) {
          console.error('Error fetching group details:', error);
          set({
            error: error.response?.data?.message || 'Failed to fetch group details',
            loading: false
          });
          throw error;
        }
      },

      updateGroup: async (groupId, updateData) => {
        set({ loading: true });
        try {
          const response = await axios.put(`/api/group/${groupId}`, updateData);
          set(state => ({
            groups: state.groups.map(group =>
              group._id === groupId ? response.data : group
            ),
            currentGroup: response.data,
            loading: false,
            successMessage: 'Group updated successfully'
          }));
          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to update group',
            loading: false
          });
          throw error;
        }
      },

      deleteGroup: async (groupId) => {
        set({ loading: true });
        try {
          await axios.delete(`/api/group/${groupId}`);
          set(state => ({
            groups: state.groups.filter(group => group._id !== groupId),
            currentGroup: null,
            loading: false,
            successMessage: 'Group deleted successfully'
          }));
          get()._clearMessages();
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to delete group',
            loading: false
          });
          throw error;
        }
      },

      // ==============================================
      //               MEMBER MANAGEMENT
      // ==============================================

      addGroupMembers: async (groupId, memberIds) => {
        set({ loading: true });
        try {
          const response = await axios.post(`/api/group/${groupId}/members`, { memberIds });
          set(state => ({
            currentGroup: {
              ...state.currentGroup,
              members: [...state.currentGroup.members, ...response.data.addedMembers],
              payoutOrder: [...state.currentGroup.payoutOrder, ...response.data.addedMemberIds]
            },
            loading: false,
            successMessage: 'Members added successfully'
          }));
          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to add members',
            loading: false
          });
          throw error;
        }
      },

      removeGroupMember: async (groupId, memberId) => {
        set({ loading: true });
        try {
          await axios.delete(`/api/group/${groupId}/members/${memberId}`);
          set(state => ({
            currentGroup: {
              ...state.currentGroup,
              members: state.currentGroup.members.filter(m => m._id !== memberId),
              payoutOrder: state.currentGroup.payoutOrder.filter(id => id !== memberId)
            },
            loading: false,
            successMessage: 'Member removed successfully'
          }));
          get()._clearMessages();
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to remove member',
            loading: false
          });
          throw error;
        }
      },

      changeMemberRole: async (groupId, memberId, role) => {
        set({ loading: true });
        try {
          const response = await axios.patch(
            `/api/group/${groupId}/members/${memberId}/role`,
            { role }
          );
          set(state => ({
            currentGroup: {
              ...state.currentGroup,
              members: state.currentGroup.members.map(member =>
                member._id === memberId ? { ...member, role } : member
              )
            },
            loading: false,
            successMessage: 'Member role updated'
          }));
          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to change role',
            loading: false
          });
          throw error;
        }
      },

      leaveGroup: async (groupId) => {
        set({ loading: true });
        try {
          await axios.post(`/api/group/${groupId}/leave`);
          set(state => ({
            groups: state.groups.filter(group => group._id !== groupId),
            currentGroup: null,
            loading: false,
            successMessage: 'Successfully left the group'
          }));
          get()._clearMessages();
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to leave group',
            loading: false
          });
          throw error;
        }
      },

      joinGroup: async (groupId) => {
        set({ loading: true });
        try {
          const response = await axios.post(`/api/group/${groupId}/join`);

          if (response.data.requiresApproval) {
            set({
              loading: false,
              successMessage: 'Join request sent to admin for approval'
            });
          } else {
            set(state => ({
              groups: [...state.groups, response.data.group],
              loading: false,
              successMessage: 'Successfully joined group'
            }));
          }

          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to join group',
            loading: false
          });
          throw error;
        }
      },

      // ==============================================
      //               GROUP SETTINGS
      // ==============================================

      updateGroupSettings: async (groupId, settings) => {
        set({ loading: true });
        try {
          const response = await axios.patch(`/api/group/${groupId}/settings`, settings);
          set(state => ({
            currentGroup: {
              ...state.currentGroup,
              ...response.data
            },
            loading: false,
            successMessage: 'Group settings updated'
          }));
          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to update settings',
            loading: false
          });
          throw error;
        }
      },

      // ==============================================
      //               PAYOUT SYSTEM
      // ==============================================

      initiateAutomaticPayout: async (groupId) => {
        set({ loading: true });
        try {
          const response = await axios.post(`/api/group/${groupId}/payouts/auto`);
          set(state => ({
            currentGroup: {
              ...state.currentGroup,
              nextPayoutDate: response.data.nextPayoutDate,
              currentPayoutIndex: response.data.nextPayoutIndex,
              payouts: [...state.currentGroup.payouts, response.data.payout]
            },
            loading: false,
            successMessage: 'Payout processed successfully'
          }));
          get()._clearMessages();
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to process payout',
            loading: false
          });
          throw error;
        }
      },

      fetchPayoutHistory: async (groupId) => {
        set({ loading: true });
        try {
          const response = await axios.get(`/api/group/${groupId}/payouts`);
          set({
            payoutHistory: response.data,
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to fetch payout history',
            loading: false
          });
          throw error;
        }
      },

      // ==============================================
      //               GROUP MESSAGING
      // ==============================================

      fetchGroupMessages: async (groupId) => {
        set({ loading: true });
        try {
          const response = await axios.get(`/api/group/${groupId}/messages`);
          set({
            groupMessages: {
              success: response.data.success,
              count: response.data.count,
              data: response.data.data
            },
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to fetch messages',
            loading: false
          });
          throw error;
        }
      },

      // Update sendMessage
      sendMessage: async (groupId, content) => {
        set({ loading: true });
        try {
          const response = await axios.post(`/api/group/${groupId}/messages`, { content });
          set(state => ({
            groupMessages: {
              ...state.groupMessages,
              data: [response.data, ...state.groupMessages.data],
              count: state.groupMessages.count + 1
            },
            loading: false
          }));
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to send message',
            loading: false
          });
          throw error;
        }
      },

      deleteMessage: async (groupId, messageId) => {
        set({ loading: true });
        try {
          await axios.delete(`/api/group/${groupId}/messages/${messageId}`);
          set(state => ({
            groupMessages: state.groupMessages.filter(msg => msg._id !== messageId),
            loading: false,
            successMessage: 'Message deleted successfully'
          }));
          get()._clearMessages();
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to delete message',
            loading: false
          });
          throw error;
        }
      },

      // ==============================================
      //               UTILITY FUNCTIONS
      // ==============================================

      clearError: () => set({ error: null }),
      clearSuccessMessage: () => set({ successMessage: null }),
      resetGroupState: () => set({
        groups: [],
        currentGroup: null,
        groupMessages: [],
        payoutHistory: [],
        joinRequests: [],
        loading: false,
        error: null,
        successMessage: null
      })
    }),
    {
      name: 'group-storage',
      partialize: (state) => ({
        groups: state.groups,
        currentGroup: state.currentGroup
      })
    }
  )
);

export default useGroupStore;