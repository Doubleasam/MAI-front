// store/referralStore.js
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useReferralStore = create((set) => ({
  // Referral State
  referralData: null,
  codeValidity: null,
  loading: false,
  error: null,

  // Get user's referral data
  fetchMyReferrals: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/referral/my-referrals', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      set({ 
        referralData: response.data,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.error || error.message,
        loading: false 
      });
      toast.error('Failed to fetch referral data');
    }
  },

  // Check referral code validity
  checkReferralCode: async (code) => {
    set({ loading: true, error: null, codeValidity: null });
    try {
      const response = await axios.get(`/api/referral/check/${code}`);
      
      set({ 
        codeValidity: response.data,
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || error.message,
        loading: false 
      });
      
      if (error.response?.status === 404) {
        return { valid: false };
      }
      
      toast.error('Failed to check referral code');
      throw error;
    }
  },

  // Clear referral state
  clearReferralData: () => set({ 
    referralData: null,
    codeValidity: null,
    error: null 
  })
}));

export default useReferralStore;