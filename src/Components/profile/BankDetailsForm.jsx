import React, { useState, useEffect } from "react";
import { FiEdit, FiCheck } from "react-icons/fi";

const BankDetailsForm = ({ darkMode, setError, setSuccess }) => {
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ibanNumber: "",
    beneficiaryName: "",
    swiftCode: "",
    isVerified: false
  });
  const [showBankForm, setShowBankForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load saved bank details from localStorage
  useEffect(() => {
    const savedBankDetails = localStorage.getItem('bankDetails');
    if (savedBankDetails) setBankDetails(JSON.parse(savedBankDetails));
  }, []);

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitBankDetails = (e) => {
    e.preventDefault();
    const updatedDetails = { ...bankDetails, isVerified: false };
    setBankDetails(updatedDetails);
    localStorage.setItem('bankDetails', JSON.stringify(updatedDetails));
    setShowBankForm(false);
    setSuccess("Bank details submitted for verification!");
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div>
      {bankDetails.bankName && !showBankForm ? (
        <div className={`p-8 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Bank Name</p>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>{bankDetails.bankName}</p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>IBAN Number</p>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>{bankDetails.ibanNumber.replace(/.(?=.{4})/g, '•')}</p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Beneficiary Name</p>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>{bankDetails.beneficiaryName}</p>
            </div>
            {bankDetails.swiftCode && (
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>SWIFT/BIC Code</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>{bankDetails.swiftCode}</p>
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
        <form onSubmit={submitBankDetails} className="max-w-lg mx-auto space-y-6">
          <div>
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bank Name*</label>
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankDetailsChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
              required
              placeholder="Enter your bank name"
            />
          </div>

          <div>
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>IBAN Number*</label>
            <input
              type="text"
              name="ibanNumber"
              value={bankDetails.ibanNumber}
              onChange={handleBankDetailsChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
              required
              placeholder="DE00 0000 0000 0000 0000 00"
              pattern="[A-Z]{2}\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4} ?[\d]{0,2}"
              title="Please enter a valid IBAN number"
            />
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Format: Country code + check digits + bank code + account number</p>
          </div>

          <div>
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Beneficiary Name*</label>
            <input
              type="text"
              name="beneficiaryName"
              value={bankDetails.beneficiaryName}
              onChange={handleBankDetailsChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
              required
              placeholder="Name as it appears on your bank account"
            />
          </div>

          <div>
            <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>SWIFT/BIC Code (if applicable)</label>
            <input
              type="text"
              name="swiftCode"
              value={bankDetails.swiftCode}
              onChange={handleBankDetailsChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
              placeholder="AAAA BB CC 123"
              pattern="[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?"
              title="Please enter a valid SWIFT/BIC code"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Bank Details'}
            </button>
            {bankDetails.bankName && (
              <button
                type="button"
                className={`flex-1 py-3 rounded-lg shadow transition ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setShowBankForm(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default BankDetailsForm;