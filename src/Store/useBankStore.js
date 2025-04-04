import { create } from 'zustand';
import { Stripe } from 'stripe';
import axios from '../Api/axios';
// Types
type BankAccount = {
  _id: string;
  bankName: string;
  accountHolderName: string;
  iban: string;
  bic?: string;
  country: string;
  currency: string;
  isVerified: boolean;
  stripeBankTokenId: string;
  createdAt: string;
};

type WithdrawalTransaction = {
  _id: string;
  reference: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';
  paymentMethod: 'bank_transfer';
  metadata: {
    bankName: string;
    ibanLast4: string;
    transferId: string;
  };
  estimatedArrival?: Date;
  createdAt: string;
};

type BankState = {
  accounts: BankAccount[];
  withdrawals: WithdrawalTransaction[];
  loading: boolean;
  error: string | null;
  selectedAccount: BankAccount | null;
  walletBalance: number | null;
  walletCurrency: string | null;
};

type BankActions = {
  // Bank Account Actions
  addBankAccount: (accountDetails: {
    bankName: string;
    accountHolderName: string;
    iban: string;
    bic?: string;
    country?: string;
    currency?: string;
  }) => Promise<BankAccount>;
  
  getBankAccounts: () => Promise<void>;
  
  // Withdrawal Actions
  withdrawToBank: (withdrawalDetails: {
    amount: number;
    bankAccountId: string;
  }) => Promise<{
    newBalance: number;
    transaction: WithdrawalTransaction;
    estimatedArrival: Date;
  }>;
  
  // Wallet Actions
  getWalletBalance: () => Promise<void>;
  
  // State Management
  setSelectedAccount: (account: BankAccount | null) => void;
  clearError: () => void;
  resetBankState: () => void;
};

// Create the store
const useBankStore = create<BankState & BankActions>()((set, get) => ({
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
      const response = await axios.post(
        '/api/wallet/bank-accounts',
        accountDetails,
        { withCredentials: true }
      );
      
      const newAccount = response.data.data;
      set((state) => ({
        accounts: [...state.accounts, newAccount],
        loading: false
      }));
      
      return newAccount;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                         'Failed to add bank account. Please verify your details.';
      set({ 
        error: errorMessage,
        loading: false
      });
      throw new Error(errorMessage);
    }
  },
  
  getBankAccounts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        '/api/wallet/bank-accounts',
        { withCredentials: true }
      );
      
      set({ 
        accounts: response.data.data || [],
        loading: false
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch bank accounts',
        loading: false
      });
      throw error;
    }
  },
  
  withdrawToBank: async (withdrawalDetails) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        '/api/wallet/withdraw/bank',
        withdrawalDetails,
        { withCredentials: true }
      );
      
      const { newBalance, transactionId, estimatedArrival } = response.data.data;
      
      // We need to get the full transaction details (this would typically come from the backend)
      const transactionResponse = await axios.get(
        `/api/transactions/${transactionId}`,
        { withCredentials: true }
      );
      
      const transaction = transactionResponse.data.data;
      
      set((state) => ({
        withdrawals: [transaction, ...state.withdrawals],
        walletBalance: newBalance,
        loading: false
      }));
      
      return {
        newBalance,
        transaction,
        estimatedArrival: new Date(estimatedArrival)
      };
    } catch (error: any) {
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
        loading: false
      });
      throw new Error(errorMessage);
    }
  },
  
  getWalletBalance: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        '/api/wallet/balance',
        { withCredentials: true }
      );
      
      set({
        walletBalance: response.data.balance,
        walletCurrency: response.data.currency,
        loading: false
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch wallet balance',
        loading: false
      });
      throw error;
    }
  },
  
  // State management helpers
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  clearError: () => set({ error: null }),
  resetBankState: () => set({ 
    accounts: [], 
    withdrawals: [], 
    selectedAccount: null,
    walletBalance: null,
    walletCurrency: null,
    error: null,
    loading: false
  })
}));

export default useBankStore;