import React, { useState } from "react";
import { FiEye, FiEyeOff, FiPlus, FiArrowDownLeft, FiArrowUpRight, FiX } from "react-icons/fi";

const Wallet = ({ darkMode, setError, setSuccess }) => {
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
    setSuccess('Card added successfully!');
    setShowAddCardModal(false);
    setCardDetails({
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: ''
    });
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    setSuccess(`Withdrawal request for $${withdrawAmount} submitted!`);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-center">Wallet</h2>
      
      {/* Balance Card */}
      <div className={`p-8 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-black'} text-white`}>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-300">Current Balance</p>
          <button onClick={() => setBalanceVisible(!balanceVisible)}>
            {balanceVisible ? <FiEyeOff className="text-gray-300" /> : <FiEye className="text-gray-300" />}
          </button>
        </div>
        <p className="text-4xl font-bold mb-8">
          {balanceVisible ? '$1,250.00' : '•••••'}
        </p>
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setShowWithdrawModal(true)}
          >
            Withdraw
          </button>
          <button 
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => setShowAddCardModal(true)}
          >
            Add Card
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className={`p-8 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Payment Methods</h3>
          <button className="text-blue-500 text-sm">View All</button>
        </div>
        <div className={`p-4 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-600' : 'bg-white'} mb-4`}>
          <div className="flex items-center">
            <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
            <span className={darkMode ? 'text-white' : 'text-gray-700'}>•••• •••• •••• 4242</span>
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
      <div className={`p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Recent Transactions</h3>
          <button className="text-blue-500 text-sm">View All</button>
        </div>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                <FiArrowDownLeft />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Deposit</p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Today, 10:45 AM</p>
              </div>
            </div>
            <p className="font-bold text-green-500">+$500.00</p>
          </div>
          <div className={`p-4 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                <FiArrowUpRight />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Withdrawal</p>
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
          <div className={`p-8 rounded-lg w-full max-w-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Add Payment Card</h3>
              <button onClick={() => setShowAddCardModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddCard}>
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                    placeholder="Name on card"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition mt-6"
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
          <div className={`p-8 rounded-lg w-full max-w-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Withdraw Funds</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleWithdraw}>
              <div className="space-y-6">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className={`w-full px-8 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>To Account</label>
                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                    required
                  >
                    <option value="">Select bank account</option>
                    <option value="bank1">•••• 1234 (Primary)</option>
                    <option value="bank2">•••• 5678</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition mt-6"
                >
                  Request Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;