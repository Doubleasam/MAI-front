import {create} from 'zustand';
import axios from '../Api/axios';

// Create the store
const useBankStore = create((set) => ({
  // Initial state
  accounts: [],
  withdrawals: [],
  loading: false,
  error: null,
  selectedAccount: null,
  walletBalance: null,
  walletCurrency: null,

  // Action implementations
  addBankAccount: async (accountDetails) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/wallet/bank-accounts', accountDetails, {
        withCredentials: true,
      });

      const newAccount = response.data.data;
      set((state) => ({
        accounts: [...state.accounts, newAccount],
        loading: false,
      }));

      return newAccount;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to add bank account. Please verify your details.';
      set({
        error: errorMessage,
        loading: false,
      });
      throw new Error(errorMessage);
    }
  },

  getBankAccounts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/wallet/bank-accounts', { withCredentials: true });

      set({
        accounts: response.data.data || [],
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch bank accounts',
        loading: false,
      });
      throw error;
    }
  },

  withdrawToBank: async (withdrawalDetails) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/wallet/withdraw/bank', withdrawalDetails, {
        withCredentials: true,
      });

      const { newBalance, transactionId, estimatedArrival } = response.data.data;

      // Get full transaction details (this would typically come from the backend)
      const transactionResponse = await axios.get(`/api/transactions/${transactionId}`, {
        withCredentials: true,
      });

      const transaction = transactionResponse.data.data;

      set((state) => ({
        withdrawals: [transaction, ...state.withdrawals],
        walletBalance: newBalance,
        loading: false,
      }));

      return {
        newBalance,
        transaction,
        estimatedArrival: new Date(estimatedArrival),
      };
    } catch (error) {
      let errorMessage = 'Withdrawal failed';

      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid withdrawal request';
        } else if (error.response.status === 402) {
          errorMessage = `Transfer failed: ${error.response.data.message}`;
        }
      }

      set({
        error: errorMessage,
        loading: false,
      });
      throw new Error(errorMessage);
    }
  },

  getWalletBalance: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/wallet/balance', { withCredentials: true });

      set({
        walletBalance: response.data.balance,
        walletCurrency: response.data.currency,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch wallet balance',
        loading: false,
      });
      throw error;
    }
  },
   fetchBankDetails : async () => {
    set({ loading: true, error: null });
  
    try {
      const response = await axios.get('/api/wallet/bank-details', { withCredentials: true });
      
      if (response.data.success && response.data.data.length === 0) {
        set({ bankDetails: [], message: response.data.message, loading: false });
      } else {
        set({ bankDetails: response.data.data, loading: false });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch bank details',
        loading: false,
      });
      throw error;
    }
  },
  


  // State management helpers
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  clearError: () => set({ error: null }),
  resetBankState: () =>
    set({
      accounts: [],
      withdrawals: [],
      selectedAccount: null,
      walletBalance: null,
      walletCurrency: null,
      error: null,
      loading: false,
    }),
}));

export default useBankStore;
