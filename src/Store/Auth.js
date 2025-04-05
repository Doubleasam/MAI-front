import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '../Api/axios';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
      otpData: null,
      tempUser: null,

      // Signup Flow
      initiateSignup: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/auth/signup/initiate', {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phone
          }, {
            _retryCount: data._retryCount || 0
          });

          set({
            otpData: {
              phone: data.phone,
              email: data.email,
              otpId: response.data.data.otpId,
              expiresAt: new Date(Date.now() + 5 * 60 * 1000),
              via: response.data.data.via,
              purpose: 'signup'
            },
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Signup initiation failed',
            loading: false
          });
          throw error;
        }
      },

      verifySignup: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/auth/signup/verify', {
            phoneNumber: data.phoneNumber,
            otp: data.otp,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            referralCode: data.referralCode
          }, {
            _retryCount: data._retryCount || 0
          });

          set({
            tempUser: {
              userId: response.data.data.userId,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
              requiresPinCreation: true
            },
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'OTP verification failed',
            loading: false
          });
          throw error;
        }
      },

      // PIN Management
      createPin: async (pin) => {
        set({ loading: true, error: null });
        try {
          const { tempUser } = get();
          if (!tempUser) throw new Error('No temporary user found');

          const response = await axios.post(
            '/api/auth/pin/create',
            { pin },
            {
              headers: {
                Authorization: `Bearer ${tempUser.accessToken}`
              },
              _retryCount: 0
            }
          );

          set({
            user: response.data.data.user,
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
            tempUser: null,
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'PIN creation failed',
            loading: false
          });
          throw error;
        }
      },

      verifyPin: async (pin) => {
        set({ loading: true, error: null });
        try {
          const { accessToken } = get();
          const response = await axios.post(
            '/api/auth/pin/verify',
            { pin },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
              _retryCount: 0
            }
          );
          set({ loading: false });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'PIN verification failed',
            loading: false
          });
          throw error;
        }
      },

      // Login Flow
      initiateLoginWithOTP: async (phoneNumber, retryCount = 0) => {
        set({ loading: true, error: null });
        try {
          if (retryCount > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }

          const response = await axios.post('/api/auth/login/otp/initiate', { phoneNumber }, {
            _retryCount: retryCount
          });

          set({
            otpData: {
              phone: phoneNumber,
              otpId: response.data.data.otpId,
              expiresAt: new Date(Date.now() + 5 * 60 * 1000),
              purpose: 'login'
            },
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to initiate OTP login',
            loading: false
          });

          // Auto-retry for network errors
          if (!error.response && retryCount < 3) {
            return get().initiateLoginWithOTP(phoneNumber, retryCount + 1);
          }

          throw error;
        }
      },

      verifyLoginWithOTP: async (phoneNumber, otp, retryCount = 0) => {
        set({ loading: true, error: null });
        try {
          if (retryCount > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }

          const response = await axios.post('/api/auth/login/otp/verify', {
            phoneNumber,
            otp
          }, {
            _retryCount: retryCount
          });

          if (response.data.data.requiresPinVerification) {
            set({
              tempUser: {
                userId: response.data.data.userId,
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken
              },
              loading: false
            });
          } else {
            set({
              user: response.data.data.user,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
              loading: false
            });
          }
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'OTP verification failed',
            loading: false
          });

          // Auto-retry for network errors
          if (!error.response && retryCount < 3) {
            return get().verifyLoginWithOTP(phoneNumber, otp, retryCount + 1);
          }

          throw error;
        }
      },

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/auth/login', credentials, {
            _retryCount: credentials._retryCount || 0
          });
          const responseData = response.data?.data || response.data;

          if (responseData.requiresPinVerification) {
            set({
              tempUser: {
                userId: responseData.id || responseData.userId,
                accessToken: responseData.accessToken,
                refreshToken: responseData.refreshToken
              },
              loading: false
            });
            return { requiresPinVerification: true };
          } else {
            set({
              user: {
                _id: responseData.id,
                firstName: responseData.firstName,
                lastName: responseData.lastName,
                email: responseData.email,
                phoneNumber: responseData.phone,
                role: responseData.role
              },
              accessToken: responseData.accessToken,
              refreshToken: responseData.refreshToken,
              loading: false
            });

            if (credentials.rememberMe) {
              localStorage.setItem('accessToken', responseData.accessToken);
              localStorage.setItem('refreshToken', responseData.refreshToken);
            }
            return responseData;
          }
        } catch (error) {
          let errorMessage = 'Login failed';
          if (error.response) {
            switch (error.response.status) {
              case 400:
                errorMessage = error.response.data?.message || 'Invalid email or password';
                break;
              case 401:
                errorMessage = 'Authentication failed';
                break;
              case 403:
                errorMessage = 'Account suspended. Please contact support.';
                break;
              case 404:
                errorMessage = 'User not found';
                break;
              default:
                errorMessage = error.response.data?.message || 'Login failed';
            }
          } else if (error.request) {
            errorMessage = 'No response from server';
          }

          set({
            error: errorMessage,
            loading: false
          });
          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          const { refreshToken } = get();
          // Only attempt logout if we have a refresh token
          if (refreshToken) {
            await axios.post('/api/auth/logout', {}, {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              }
            });
          }

          // Clear localStorage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          // Clear sessionStorage if used
          sessionStorage.clear();

          // Reset all state
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            loading: false,
            error: null,
            otpData: null,
            tempUser: null
          });

          // Clear persisted storage
          const persistor = useAuthStore.persist;
          await persistor.clearStorage();

        } catch (error) {
          // Even if logout fails, clear everything
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            loading: false,
            otpData: null,
            tempUser: null
          });

          const persistor = useAuthStore.persist;
          await persistor.clearStorage();

          throw error;
        }
      },

      // Token Management
      refreshAccessToken: async () => {
        set({ loading: true, error: null });
        try {
          const { refreshToken } = get();
          
          // Only proceed if we have a refresh token
          if (!refreshToken) {
            throw new Error('NO_REFRESH_TOKEN');
          }
      
          const response = await axios.post('/api/auth/token/refresh', { 
            refreshToken 
          }, {
            _retry: false // Don't retry refresh token requests
          });
      
          // Update both tokens (assuming backend returns new refresh token)
          set({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken || refreshToken, // Keep old if new not provided
            loading: false
          });
      
          return response.data;
        } catch (error) {
          set({ loading: false });
          
          // Only logout if we get specific error about invalid refresh token
          if (error.response?.data?.code === 'INVALID_REFRESH_TOKEN') {
            await get().logout(true); // Silent logout
            throw new Error('SESSION_EXPIRED');
          }
          
          // For other errors, just throw without logging out
          throw error;
        }
      },

      // Password Management
      // In your useAuthStore implementation:

      // Password Management
      requestPasswordReset: async (phoneNumber, retryCount = 0) => {
        set({ loading: true, error: null });
        try {
          if (retryCount > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }

          const response = await axios.post('/api/auth/password/reset/request', { phoneNumber }, {
            _retryCount: retryCount
          });

          set({
            otpData: {
              phone: phoneNumber,
              otpId: response.data.data.otpId,
              expiresAt: new Date(Date.now() + 5 * 60 * 1000),
              purpose: 'password_reset'
            },
            loading: false
          });
          return response.data;
        } catch (error) {
          let errorMessage = 'Failed to request password reset';

          if (error.response) {
            if (error.response.status === 404) {
              errorMessage = 'No account found with this phone number';
            } else {
              errorMessage = error.response.data?.message || errorMessage;
            }
          }

          set({
            error: errorMessage,
            loading: false
          });

          // Auto-retry for network errors
          if (!error.response && retryCount < 3) {
            return get().requestPasswordReset(phoneNumber, retryCount + 1);
          }

          throw error;
        }
      },

      resetPassword: async (phoneNumber, otp, newPassword, retryCount = 0) => {
        set({ loading: true, error: null });
        try {
          if (retryCount > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }

          const response = await axios.post('/api/auth/password/reset', {
            phoneNumber,
            otp,
            newPassword
          }, {
            _retryCount: retryCount
          });

          set({ loading: false });
          return response.data;
        } catch (error) {
          let errorMessage = 'Password reset failed';

          if (error.response) {
            switch (error.response.status) {
              case 400:
                errorMessage = error.response.data?.message || 'Invalid OTP or password requirements not met';
                break;
              case 401:
                errorMessage = 'OTP expired or invalid';
                break;
              default:
                errorMessage = error.response.data?.message || errorMessage;
            }
          }

          set({
            error: errorMessage,
            loading: false
          });

          // Auto-retry for network errors
          if (!error.response && retryCount < 3) {
            return get().resetPassword(phoneNumber, otp, newPassword, retryCount + 1);
          }

          throw error;
        }
      },

      updatePassword: async (oldPassword, newPassword, email) => {
        set({ loading: true, error: null });
        try {
          const { accessToken } = get();
          const response = await axios.put('/api/auth/password/update', {
            oldPassword,
            newPassword,
            email
          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          set({ loading: false });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Password update failed',
            loading: false
          });
          throw error;
        }
      },

      // Profile Management
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });
        try {
          const { accessToken } = get();
          const response = await axios.put('/api/auth/profile', profileData, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          set(state => ({
            user: {
              ...state.user,
              ...response.data.data
            },
            loading: false
          }));

          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Profile update failed',
            loading: false
          });
          throw error;
        }
      },

      // OTP Management
      resendOtp: async () => {
        set({ loading: true, error: null });
        try {
          const { otpData } = get();
          if (!otpData) throw new Error('No OTP data found');

          let endpoint, payload;
          switch (otpData.purpose) {
            case 'signup':
              endpoint = '/api/auth/signup/resend-otp';
              payload = { phoneNumber: otpData.phone, otpId: otpData.otpId };
              break;
            case 'login':
              endpoint = '/api/auth/login/otp/initiate';
              payload = { phoneNumber: otpData.phone };
              break;
            case 'password_reset':
              endpoint = '/api/auth/password/reset/request';
              payload = { phoneNumber: otpData.phone };
              break;
            default:
              throw new Error('Unknown OTP purpose');
          }

          const response = await axios.post(endpoint, payload);

          set({
            otpData: {
              ...otpData,
              otpId: response.data.data.otpId,
              expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            },
            loading: false
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Failed to resend OTP',
            loading: false
          });
          throw error;
        }
      },

      // Utility Functions
      clearError: () => set({ error: null }),
      resetAuthState: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
          error: null,
          otpData: null,
          tempUser: null
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken
      }),
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) return persistedState;
        return persistedState;
      }
    }
  )
);

// Configure axios instance to avoid rate limiting
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, (err) => {
  const config = err.config;

  // If config doesn't exist or retry option is not set, reject
  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  // Set variable for keeping track of retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(() => {
    return axios(config);
  });
});

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        if (!refreshPromise) {
          refreshPromise = useAuthStore.getState().refreshAccessToken()
            .catch(err => {
              // Only logout if no refresh token exists
              if (err.message === 'NO_REFRESH_TOKEN') {
                useAuthStore.getState().logout(true);
              }
              throw err;
            })
            .finally(() => { refreshPromise = null; });
        }
        
        await refreshPromise;
        
        // Retry with new token
        const { accessToken } = useAuthStore.getState();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
        
      } catch (refreshError) {
        // Only propagate the error if it's not about missing refresh token
        if (refreshError.message !== 'NO_REFRESH_TOKEN') {
          throw refreshError;
        }
        // For missing refresh token, the logout already happened
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add timestamp to avoid caching
    if (config.method === 'get') {
      config.params = { ...config.params, _t: Date.now() };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default useAuthStore;