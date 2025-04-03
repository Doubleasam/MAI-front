import React, { useState, useEffect } from "react";
import { 
  FiEdit, FiChevronDown, FiChevronUp, FiCheck, FiX, 
  FiUpload, FiEye, FiEyeOff, FiArrowDownLeft, 
  FiArrowUpRight, FiCreditCard, FiPlus 
} from "react-icons/fi";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ibanNumber: "",
    beneficiaryName: "",
    swiftCode: "",
    isVerified: false
  });
  const [showBankForm, setShowBankForm] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "janedoe",
    phoneNumber: "+234 900 7002",
    email: "janedoe2000@gmail.com",
    avatar: "https://via.placeholder.com/150"
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    const savedBankDetails = localStorage.getItem('bankDetails');
    const savedProfile = localStorage.getItem('profileData');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedBankDetails) setBankDetails(JSON.parse(savedBankDetails));
    if (savedProfile) setProfileData(JSON.parse(savedProfile));
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = () => {
    if (selectedFile) {
      setProfileData(prev => ({
        ...prev,
        avatar: previewImage
      }));
      alert("Profile picture updated successfully!");
    }
  };

  const submitBankDetails = (e) => {
    e.preventDefault();
    const updatedDetails = { ...bankDetails, isVerified: false };
    setBankDetails(updatedDetails);
    localStorage.setItem('bankDetails', JSON.stringify(updatedDetails));
    setShowBankForm(false);
    alert("Bank details submitted for verification!");
  };

  const saveProfileChanges = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert("Profile changes saved!");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      return;
    }
    
    if (name === 'expiry' && value.length === 2 && !value.includes('/')) {
      setCardDetails(prev => ({
        ...prev,
        [name]: value + '/'
      }));
      return;
    }
    
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    alert('Card added successfully!');
    setShowAddCardModal(false);
    setCardDetails({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: ''
    });
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    alert(`Withdrawal request for $${withdrawAmount} submitted!`);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  return (
    <div className={`flex min-h-screen px-4 md:px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <aside className={`w-full md:w-1/3 p-2 md:p-3 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* User Profile */}
        <div className="flex items-center gap-5 mb-6">
          <img
            src={previewImage || profileData.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{profileData.username}</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{profileData.email}</p>
          </div>
          <button
            className={`ml-auto text-sm flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
            onClick={() => setActiveTab("profile")}
          >
            <FiEdit className="mr-1" /> Edit
          </button>
        </div>
        
        {/* Navigation */}
        <nav>
          <h3 className={`text-sm uppercase mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Account Settings</h3>
          <ul className="space-y-3">
            <li
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "profile" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </li>
            <li
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "security" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => setActiveTab("security")}
            >
              Password & Security
            </li>
            <li
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "notifications" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </li>
          </ul>

          <h3 className={`text-sm uppercase mt-4 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payout and Settings</h3>
          <ul className="space-y-3">
            <li
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "bank" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
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
              className={`cursor-pointer hover:text-blue-500 ${activeTab === "wallet" ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => setActiveTab("wallet")}
            >
              Wallet
            </li>
          </ul>

          <h3 className={`text-sm uppercase mt-4 mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Others</h3>
          <ul className="space-y-3">
            <li
              className={`flex justify-between items-center cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={toggleDarkMode}
            >
              <span>Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </li>
            <li className={`cursor-pointer hover:text-blue-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              FAQ
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <section className={`w-full md:w-3/4 p-4 md:p-4 rounded-lg shadow-md ml-0 md:ml-6 mt-4 md:mt-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {activeTab === "profile" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-6">Profile Information</h2>

            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={previewImage || profileData.avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <div className="flex flex-col items-center">
                <label className="cursor-pointer text-blue-500 text-sm flex items-center">
                  <FiUpload className="mr-1" />
                  <span>Change Photo</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                {previewImage && (
                  <button
                    className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={uploadAvatar}
                  >
                    Save Photo
                  </button>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="max-w-md mx-auto space-y-4">
              {/* Username Field */}
              <div>
                <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100'}`}
                  disabled
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone Number</label>
                <div className={`flex items-center border rounded-lg px-4 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}>
                  <span className="mr-2">🇳🇬</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                    className={`w-full focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : ''}`}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-6"
                onClick={saveProfileChanges}
              >
                Save Changes
              </button>
            </div>
          </>
        )}

        {activeTab === "bank" && (
          <div>
            {bankDetails.bankName && !showBankForm ? (
              <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Bank Name</p>
                    <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>{bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>IBAN Number</p>
                    <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>{bankDetails.ibanNumber.replace(/.(?=.{4})/g, '•')}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Beneficiary Name</p>
                    <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>{bankDetails.beneficiaryName}</p>
                  </div>
                  {bankDetails.swiftCode && (
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>SWIFT/BIC Code</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>{bankDetails.swiftCode}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm px-3 py-1 rounded-full ${bankDetails.isVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {bankDetails.isVerified ? "Verified" : "Pending Verification"}
                  </span>
                  <button
                    className={`text-sm flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
                    onClick={() => setShowBankForm(true)}
                  >
                    <FiEdit className="mr-1" /> Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitBankDetails} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bank Name*</label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    required
                    placeholder="Enter your bank name"
                  />
                </div>

                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>IBAN Number*</label>
                  <input
                    type="text"
                    name="ibanNumber"
                    value={bankDetails.ibanNumber}
                    onChange={handleBankDetailsChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    required
                    placeholder="DE00 0000 0000 0000 0000 00"
                    pattern="[A-Z]{2}\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4} ?[\d]{0,2}"
                    title="Please enter a valid IBAN number"
                  />
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Format: Country code + check digits + bank code + account number</p>
                </div>

                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Beneficiary Name*</label>
                  <input
                    type="text"
                    name="beneficiaryName"
                    value={bankDetails.beneficiaryName}
                    onChange={handleBankDetailsChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    required
                    placeholder="Name as it appears on your bank account"
                  />
                </div>

                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>SWIFT/BIC Code (if applicable)</label>
                  <input
                    type="text"
                    name="swiftCode"
                    value={bankDetails.swiftCode}
                    onChange={handleBankDetailsChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="AAAA BB CC 123"
                    pattern="[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?"
                    title="Please enter a valid SWIFT/BIC code"
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
                      className={`flex-1 py-2 rounded-lg transition ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      onClick={() => setShowBankForm(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Password & Security</h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? "text" : "password"}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}`}
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        {showPassword.current ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}`}
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showPassword.new ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : ''}`}
                      />
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Update Password
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>SMS Authentication</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Add extra security to your account</p>
                  </div>
                  <button className={`px-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
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
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={darkMode ? 'text-gray-300' : ''}>App Announcements</span>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Important updates about the app</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={darkMode ? 'text-gray-300' : ''}>Payment Alerts</span>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Instant notifications for payments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={darkMode ? 'text-gray-300' : ''}>Group Notifications</span>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updates from your groups</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={darkMode ? 'text-gray-300' : ''}>Sound Alerts</span>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Play sound for notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={darkMode ? 'text-gray-300' : ''}>Vibration</span>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vibrate for important notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
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
            
            {/* Balance Card */}
            <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-black'} text-white`}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-300">Current Balance</p>
                <button onClick={() => setBalanceVisible(!balanceVisible)}>
                  {balanceVisible ? <FiEyeOff className="text-gray-300" /> : <FiEye className="text-gray-300" />}
                </button>
              </div>
              <p className="text-3xl font-bold mb-6">
                {balanceVisible ? '$1,250.00' : '•••••'}
              </p>
              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setShowWithdrawModal(true)}
                >
                  Withdraw
                </button>
                <button 
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                  onClick={() => setShowAddCardModal(true)}
                >
                  Add Card
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Payment Methods</h3>
                <button className="text-blue-500 text-sm">View All</button>
              </div>
              <div className={`p-4 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-600' : 'bg-white'} mb-3`}>
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
                  <span className={darkMode ? 'text-white' : ''}>•••• •••• •••• 4242</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Primary</span>
              </div>
              <button 
                className="w-full border-2 border-dashed border-gray-300 py-3 rounded-lg text-gray-500 hover:border-gray-400 transition flex items-center justify-center"
                onClick={() => setShowAddCardModal(true)}
              >
                <FiPlus className="mr-2" /> Add Debit/Credit Card
              </button>
            </div>

            {/* Recent Transactions */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Recent Transactions</h3>
                <button className="text-blue-500 text-sm">View All</button>
              </div>
              <div className="space-y-4">
                <div className={`p-3 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <FiArrowDownLeft />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>Deposit</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Today, 10:45 AM</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-500">+$500.00</p>
                </div>
                <div className={`p-3 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                      <FiArrowUpRight />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : ''}`}>Withdrawal</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Yesterday, 2:30 PM</p>
                    </div>
                  </div>
                  <p className="font-bold text-red-500">-$250.00</p>
                </div>
              </div>
            </div>

            {/* Add Card Modal */}
            {showAddCardModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add Payment Card</h3>
                    <button onClick={() => setShowAddCardModal(false)} className="text-gray-500 hover:text-gray-700">
                      <FiX />
                    </button>
                  </div>
                  <form onSubmit={handleAddCard}>
                    <div className="space-y-4">
                      <div>
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                            placeholder="123"
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cardholder Name</label>
                        <input
                          type="text"
                          name="name"
                          value={cardDetails.name}
                          onChange={handleCardInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          placeholder="Name on card"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-4"
                      >
                        Add Card
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Withdraw Modal */}
            {showWithdrawModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Withdraw Funds</h3>
                    <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-gray-700">
                      <FiX />
                    </button>
                  </div>
                  <form onSubmit={handleWithdraw}>
                    <div className="space-y-4">
                      <div>
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                          <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className={`w-full px-8 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                            placeholder="0.00"
                            min="1"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>To Account</label>
                        <select 
                          className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                          required
                        >
                          <option value="">Select bank account</option>
                          <option value="bank1">•••• 1234 (Primary)</option>
                          <option value="bank2">•••• 5678</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-4"
                      >
                        Request Withdrawal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;