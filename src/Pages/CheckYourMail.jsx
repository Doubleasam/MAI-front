import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import Logo from "../assets/MAI.png";

const CheckYourMail = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <FiMail className="text-indigo-600 text-4xl" />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-2">Check your mail</h2>
            <p className="text-[16px] text-[#9E9E9E]">
              We have sent you a reset password link to your registered email address
            </p>
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-500 italic">
              Open your mailbox app to find the password reset link
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              to="/signin"
              className="w-full py-3 px-4 bg-indigo-600 text-white text-[16px] font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
            >
              Back to Sign In
            </Link>

            <p className="text-sm text-gray-500">
              Didn't receive the email?{' '}
              <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckYourMail;