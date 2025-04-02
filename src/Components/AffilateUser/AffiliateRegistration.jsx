import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateIllustration from "../../assets/MAI.png";

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
];

function AffiliateRegistration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
    <div className="h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm">
        {/* Header with Logo */}
        <div className="text-center p-3">
          <div className="flex justify-center mb-1">
            <img 
              src={AffiliateIllustration} 
              alt="Affiliate Program" 
              className="h-8"
            />
          </div>
          <h2 className="text-lg font-bold text-black">Become an Affiliate</h2>
          <p className="text-xs text-gray-600 mt-1">
            Please provide your details to start earning
          </p>
        </div>

        {/* Form Section */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Username*</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="john_doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Email*</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Phone Number*</label>
              <div className="flex">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => setSelectedCountry(
                    countries.find(c => c.code === e.target.value) || countries[0]
                  )}
                  className="w-1/4 px-1 py-1 text-xs border border-gray-300 rounded-l focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="flex-1 px-2 py-1 text-xs border-t border-r border-b border-gray-300 rounded-r focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="1234567890"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Password*</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start pt-1">
              <div className="flex items-center h-4">
                <input
                  name="agreed"
                  type="checkbox"
                  required
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="h-3 w-3 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-2 text-xs">
                <label className="text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-3 text-xs bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition duration-150 mt-2"
            >
              Join Affiliate Program
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600">
              Already an affiliate?{' '}
              <Link to="/affiliate-login" className="text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateRegistration;