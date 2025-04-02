import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/MAI.png";

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password email sent to:', email);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto p-6">
        {/* Logo - Centered at top */}
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="MAI Logo" className="h-16" />
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-[#1E1E1E] mb-2">Reset Password</h2>
            <p className="text-[16px] text-[#9E9E9E]">
              Please provide us with the email associated with your account
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#1E1E1E]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#9E9E9E] rounded-lg text-[16px] text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white text-[16px] font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
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