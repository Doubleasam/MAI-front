// ResetPassword.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/MAI.png";
import useAuthStore from '../Store/Auth';

const ResetPassword = () => {
  const { requestPasswordReset, loading, error, clearError } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    try {
      await requestPasswordReset(phoneNumber);
      // Optionally navigate to OTP verification page if needed
      // navigate('/verify-otp'); // if using react-router
    } catch (err) {
      console.error("Password reset request failed", err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto p-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="MAI Logo" className="h-16" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Reset Password</h2>
            <p className="text-[16px] text-[#9E9E9E]">
              Please enter your phone number to receive an OTP
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-[#1E1E1E]">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                pattern="^\+?\d{10,15}$"
                placeholder="+251912345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-[#9E9E9E] rounded-lg text-[16px] text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-indigo-600 text-white text-[16px] font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send SMS OTP'}
              </button>

              <div className="text-center">
                <Link
                  to="/signin"
                  className="text-indigo-600 hover:text-indigo-500 text-[16px] font-medium"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;