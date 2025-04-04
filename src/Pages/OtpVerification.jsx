import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Family from "../assets/Family.jpeg";
import useAuthStore from '../Store/Auth';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { 
    verifyOtp, 
    loading, 
    error, 
    clearError,
    resendOtp 
  } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Get signup data from navigation state
  const signupData = location.state?.signupData;

  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
  }, [signupData, navigate]);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    
    if (value && index === 5) {
      document.getElementById('verify-button').click();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (otp.join('').length !== 6) return;
    
    try {
      await verifyOtp({
        ...signupData,
        otp: otp.join('')
      });
      navigate('/create-pin');
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    clearError();
    try {
      await resendOtp({
        phone: signupData.phoneNumber,
        email: signupData.email
      });
      setCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      document.getElementById('otp-0').focus();
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Verification Code</h2>
            <p className="text-gray-600 mt-2">
              We've sent a 6-digit code to {signupData?.phoneNumber || 'your phone'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    autoFocus={index === 0}
                    className="w-12 h-16 text-center text-2xl font-semibold border border-gray-300 rounded-md 
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  {canResend ? (
                    <button 
                      type="button" 
                      onClick={handleResend}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Resend Code
                    </button>
                  ) : (
                    `Resend code in ${countdown} seconds`
                  )}
                </p>
              </div>

              <button
                id="verify-button"
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className={`w-full py-3 px-4 text-white text-lg font-medium rounded-md transition-colors
                          ${loading ? 'bg-indigo-400 cursor-not-allowed' : 
                            otp.join('').length !== 6 ? 'bg-indigo-300 cursor-not-allowed' : 
                            'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify Code'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative bg-indigo-900">
        <img
          src={Family}
          alt="Family enjoying savings"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-8">
          <div className="max-w-md mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome to MAI Savings</h2>
            <p className="text-lg mb-6">
              Join forces with friends and family to save for your dreams!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;