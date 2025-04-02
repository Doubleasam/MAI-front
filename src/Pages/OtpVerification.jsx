import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Family from "../assets/Family.jpeg";

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const phoneNumber = '+234-98494549'; // Example phone number

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = otp.join('');
    console.log('Verification code:', verificationCode);
    // Add your verification logic here
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Column - OTP Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="mb-6 text-center">
            <h2 className="text-[34px] font-bold text-[#1E1E1E]">Verification</h2>
            <p className="text-[16px] text-[#9E9E9E] mt-2">
              Please type the verification code sent to {phoneNumber}
            </p>
          </div>

          {/* OTP Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Inputs */}
              <div className="flex justify-center space-x-4">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    className="w-16 h-16 text-center text-[24px] border border-[#9E9E9E] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>

              {/* Resend OTP Link */}
              <div className="text-center">
                <p className="text-[16px] text-[#9E9E9E]">
                  Didn't receive OTP code?{' '}
                  <button 
                    type="button" 
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white text-[16px] font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Code
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src={Family}
          alt="Family enjoying savings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="max-w-md mx-auto text-center text-white">
            <h2 className="text-[24px] font-bold mb-2">Welcome to MAI</h2>
            <p className="text-[16px]">
              Join forces with friends and family to save for your dreams! Our fun and intuitive group savings app makes pooling funds easy, exciting, and rewarding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;