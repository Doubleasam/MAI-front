import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Family from "../assets/Family.jpeg";

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
];

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    referralCode: '',
    phone: '',
    password: '',
    agreed: false
  });
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ 
      ...formData, 
      phone: selectedCountry.dialCode + formData.phone 
    });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Column - Sign Up Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="mb-3 ">
            <h2 className="text-xl font-bold text-[#1E1E1E] text-[34px]">Create Account</h2>
            <p className="text-sm text-gray-600 text-[16px]">
              Join our community and start your savings journey!
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-gray-700 text-[16px] mb-0.5">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-[16px]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 text-[16px] mb-0.5">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-[16px]"
                />
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-xs font-medium text-gray-700 text-[16px] mb-0.5">Referral Code (Optional)</label>
                <input
                  name="referralCode"
                  type="text"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-[16px]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-700 text-[16px] mb-0.5">Phone Number</label>
                <div className="flex">
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => setSelectedCountry(
                      countries.find(c => c.code === e.target.value) || countries[0]
                    )}
                    className="w-1/4 px-1 py-1 border border-gray-300 rounded-l text-[16px]"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.dialCode}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-2 py-1 border-t border-r border-b border-gray-300 text-[16px] rounded-r text-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 text-[16px] mb-0.5">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 text-[16px] rounded text-xs"
                />
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-center">
                <input
                  name="agreed"
                  type="checkbox"
                  required
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="h-3 w-3 text-indigo-600 text-[16px] rounded"
                />
                <label className="ml-1 text-xs text-gray-700 text-[16px]">
                  I agree to the Terms and Conditions
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-1 px-3 bg-indigo-600 text-white text-[16px] font-medium rounded hover:bg-indigo-700 mt-1"
              >
                Create Account
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-600 text-[16px]">
                Already have an account?{' '}
                <Link to="/signin" className="text-indigo-600 hover:text-indigo-500 text-[16px]">
                  Sign in
                </Link>
              </p>
            </div>
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <div className=" text-white">
            <h2 className="text-[48px] font-bold mb-0.5 text-center">Welcome to MAI</h2>
            <p className="text-[18px]">
              JJoin forces with friends and family to save for your dreams! Our fun and intuitive group savings app makes pooling funds easy, exciting, and rewarding
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;