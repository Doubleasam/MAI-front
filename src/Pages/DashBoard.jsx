import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';
import useAuthStore from '../Store/Auth'; // Import your auth store

function DashBoard() {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Get user data from auth store
  const { user } = useAuthStore();
  const userRole = user?.role || 'user'; // Default to 'user' if role not specified
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const referralCode = user?.referralCode || "KLKSDJHSHSH"; // Fallback if no referral code
  
  // Mock data - replace with actual data from your backend
  const profileCompletion = 75;
  const currentBalance = 0;
  const totalReferrals = 38;

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[660px] h-max p-3">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome Back, {firstName} {lastName}</p>
      
      {/* Current Balance Card - Shown for all users */}
      <div className="bg-black text-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium mb-2">Current Balance</h3>
            <p className="text-3xl font-bold mb-4">
              {balanceVisible ? `$${currentBalance.toFixed(2)}` : '••••••'}
            </p>
          </div>
          <button 
            onClick={toggleBalanceVisibility}
            className="text-gray-400 hover:text-white mt-1"
          >
            {balanceVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Profile Completion Section - Only for non-affiliate users */}
        {userRole !== 'affiliate' && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-300">Profile Completion</span>
              <span className="text-white">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
              <div 
                className="bg-blue-400 h-2 rounded-full" 
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-gray-300 text-sm">Please setup bank details to complete your profile</p>
          </div>
        )}
      </div>

      {/* Affiliate Section - Only shown for affiliate users */}
      {userRole === 'affiliate' && (
        <div className="p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {/* Total Referrals */}
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Total Referrals</h3>
              <p className="text-3xl font-bold text-indigo-600">{totalReferrals}</p>
            </div>
            
            {/* Referral Code */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Your Referral Code</h3>
              <div className="flex items-center">
                <p className="text-xl font-mono font-bold bg-gray-100 px-3 py-1 rounded mr-2">
                  {referralCode}
                </p>
                <button 
                  onClick={copyReferralCode}
                  className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-gray-100"
                  title="Copy to clipboard"
                >
                  <FiCopy size={20} />
                </button>
              </div>
              {copied && <span className="text-xs text-green-600 mt-1 inline-block">Copied!</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;