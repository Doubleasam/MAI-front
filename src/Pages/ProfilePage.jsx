import React, { useState } from "react";
import { FiEdit, FiChevronDown, FiChevronUp, FiCheck, FiX } from "react-icons/fi";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    routingNumber: "",
    isVerified: false
  });
  const [showBankForm, setShowBankForm] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "janedoe",
    phoneNumber: "+234 900 7002",
    email: "janedoe2000@gmail.com",
    avatar: "https://via.placeholder.com/150"
  });

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitBankDetails = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    setBankDetails(prev => ({ ...prev, isVerified: false }));
    setShowBankForm(false);
    alert("Bank details submitted for verification!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white p-4 md:p-6 rounded-lg shadow-md">
        {/* User Profile */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={profileData.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{profileData.username}</h2>
            <p className="text-gray-500 text-sm">{profileData.email}</p>
          </div>
          <button 
            className="ml-auto text-sm text-blue-500 flex items-center"
            onClick={() => setActiveTab("profile")}
          >
            <FiEdit className="mr-1" /> Edit
          </button>
        </div>

        {/* Referral Card */}
        <div className="bg-purple-500 text-white p-4 rounded-lg text-center mb-6">
          <h3 className="font-semibold">Refer Friends, Get $500</h3>
          <p className="text-xs mt-1">Get $50 every time your friend makes their first transaction.</p>
        </div>

        {/* Navigation */}
        <nav>
          <h3 className="text-gray-400 text-sm uppercase mb-2">Account Settings</h3>
          <ul className="space-y-3">
            <li 
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "profile" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </li>
            <li 
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "security" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("security")}
            >
              Password & Security
            </li>
            <li 
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "notifications" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </li>
          </ul>

          <h3 className="text-gray-400 text-sm uppercase mt-4 mb-2">Payout and Settings</h3>
          <ul className="space-y-3">
            <li 
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "bank" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => {
                setActiveTab("bank");
                setShowBankForm(true);
              }}
            >
              <div className="flex justify-between items-center">
                <span>Bank Details</span>
                {bankDetails.bankName ? (
                  bankDetails.isVerified ? (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full flex items-center">
                      <FiCheck className="mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center">
                      Pending Verification
                    </span>
                  )
                ) : (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Not Added</span>
                )}
              </div>
            </li>
            <li 
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "wallet" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("wallet")}
            >
              Wallet
            </li>
          </ul>

          <h3 className="text-gray-400 text-sm uppercase mt-4 mb-2">Others</h3>
          <ul className="space-y-3">
            <li className="text-gray-700 cursor-pointer hover:text-blue-500">Dark Mode</li>
            <li className="text-gray-700 cursor-pointer hover:text-blue-500">FAQ</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="w-full md:w-3/4 bg-white p-4 md:p-8 rounded-lg shadow-md ml-0 md:ml-6 mt-4 md:mt-0">
        {activeTab === "profile" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-6">Profile Information</h2>
            
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={profileData.avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full mb-4"
              />
              <button className="text-sm text-blue-500">Change Photo</button>
            </div>

            {/* Form */}
            <div className="max-w-md mx-auto space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  disabled
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-gray-600 mb-1">Phone Number</label>
                <div className="flex items-center border rounded-lg px-4 py-2">
                  <span className="mr-2">🇳🇬</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-6">
                Save Changes
              </button>
            </div>
          </>
        )}

        {activeTab === "bank" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Bank Details</h2>
            
            {bankDetails.bankName && !showBankForm ? (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Bank Name</p>
                    <p className="font-medium">{bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Number</p>
                    <p className="font-medium">•••• •••• {bankDetails.accountNumber.slice(-4)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Name</p>
                    <p className="font-medium">{bankDetails.accountName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Routing Number</p>
                    <p className="font-medium">{bankDetails.routingNumber}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    bankDetails.isVerified 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {bankDetails.isVerified ? "Verified" : "Pending Verification"}
                  </span>
                  <button 
                    className="text-blue-500 text-sm flex items-center"
                    onClick={() => setShowBankForm(true)}
                  >
                    <FiEdit className="mr-1" /> Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitBankDetails} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Account Name</label>
                  <input
                    type="text"
                    name="accountName"
                    value={bankDetails.accountName}
                    onChange={handleBankDetailsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Routing Number (if applicable)</label>
                  <input
                    type="text"
                    name="routingNumber"
                    value={bankDetails.routingNumber}
                    onChange={handleBankDetailsChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Save Bank Details
                  </button>
                  {bankDetails.bankName && (
                    <button 
                      type="button" 
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                      onClick={() => setShowBankForm(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    For security reasons, bank details verification may take up to 48 hours. 
                    Please ensure all information is accurate before submitting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Password & Security</h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                    />
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-gray-500 text-sm">Add extra security to your account</p>
                  </div>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Transaction alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Promotional offers</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Account updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>App notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sound alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "wallet" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Wallet</h2>
            <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-500">Available Balance</p>
                  <p className="text-2xl font-bold">$1,250.00</p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Withdraw
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium">Total Earnings</p>
                    <p className="text-gray-500 text-sm">From referrals</p>
                  </div>
                  <p className="font-bold text-green-500">+$500.00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium">Withdrawals</p>
                    <p className="text-gray-500 text-sm">Processed payments</p>
                  </div>
                  <p className="font-bold text-red-500">-$250.00</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;