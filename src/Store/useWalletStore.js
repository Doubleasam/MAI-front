// store/walletStore.js
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useWalletStore = create((set, get) => ({
  // User Wallet State
  userWallet: null,
  loading: false,
  error: null,
  transactions: [],
  deposits: [],

  // Group Wallet State
  groupWallets: {},
  groupTransactions: {},

  // Initialize user wallet
  initializeUserWallet: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/wallet', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ userWallet: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      toast.error('Failed to load wallet');
    }
  },

  // Deposit funds
  deposit: async (amount, paymentMethod, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/wallet/deposit', 
        { amount, paymentMethod, token },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      set(state => ({
        userWallet: {
          ...state.userWallet,
          balance: response.data.data.newBalance
        },
        loading: false
      }));
      
      toast.success('Deposit successful');
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      toast.error('Deposit failed');
      throw error;
    }
  },

  // Withdraw funds
  withdraw: async (amount, bankAccountId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/wallet/withdraw', 
        { amount, bankAccountId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      set(state => ({
        userWallet: {
          ...state.userWallet,
          balance: response.data.data.newBalance,
          lockedBalance: response.data.data.lockedBalance
        },
        loading: false
      }));
      
      toast.success('Withdrawal request submitted');
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      toast.error('Withdrawal failed');
      throw error;
    }
  },

  // Get deposit history
  getDepositHistory: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/wallet/deposits', {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      set({ deposits: response.data.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  // Group Wallet Operations
  getGroupWallet: async (groupId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/groups/${groupId}/wallet`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      set(state => ({
        groupWallets: {
          ...state.groupWallets,
          [groupId]: response.data
        },
        loading: false
      }));
      
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  contributeToGroup: async (groupId, amount) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`/api/groups/${groupId}/contribute`, 
        { amount },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Update both user wallet and group wallet states
      set(state => ({
        userWallet: {
          ...state.userWallet,
          balance: response.data.userBalance
        },
        groupWallets: {
          ...state.groupWallets,
          [groupId]: {
            ...state.groupWallets[groupId],
            balance: response.data.groupBalance
          }
        },
        loading: false
      }));
      
      toast.success('Contribution successful');
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      toast.error('Contribution failed');
      throw error;
    }
  },

  processGroupPayout: async (groupId, recipientId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`/api/groups/${groupId}/payout`, 
        { recipientId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Update both user wallet (if recipient is current user) and group wallet states
      set(state => {
        const updates = {
          groupWallets: {
            ...state.groupWallets,
            [groupId]: {
              ...state.groupWallets[groupId],
              balance: response.data.groupBalance
            }
          },
          loading: false
        };
        
        if (recipientId === get().userWallet?.user?._id) {
          updates.userWallet = {
            ...state.userWallet,
            balance: response.data.recipientBalance
          };
        }
        
        return updates;
      });
      
      toast.success('Payout processed successfully');
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      toast.error('Payout failed');
      throw error;
    }
  },
  // Get personal transaction history
getMyTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/wallet/transactions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ transactions: response.data.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      toast.error('Failed to fetch transactions');
      throw error;
    }
  },
  

  // Clear wallet state
  clearWallet: () => set({ 
    userWallet: null, 
    transactions: [], 
    deposits: [], 
    groupWallets: {}, 
    groupTransactions: {} 
  })
}));

export default useWalletStore;