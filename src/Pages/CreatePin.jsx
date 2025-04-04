import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Family from "../assets/Family.jpeg";
import useAuthStore from '../Store/Auth';

const CreatePin = () => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const { createPin, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleConfirmPinChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newConfirmPin = [...confirmPin];
    newConfirmPin[index] = value;
    setConfirmPin(newConfirmPin);

    if (value && index < 3) {
      document.getElementById(`confirm-pin-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (step === 1) {
      setStep(2);
      setConfirmPin(['', '', '', '']);
      return;
    }

    if (pin.join('') !== confirmPin.join('')) {
      alert("PINs don't match!");
      return;
    }

    try {
      await createPin(pin.join(''));
      navigate('/dashboard');
    } catch (error) {
      console.error('PIN creation error:', error);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-[34px] font-bold text-[#1E1E1E]">
              {step === 1 ? 'Create PIN' : 'Confirm PIN'}
            </h2>
            <p className="text-[16px] text-[#9E9E9E] mt-2">
              {step === 1 
                ? 'Create a 4-digit PIN to secure your account' 
                : 'Please re-enter your PIN to confirm'}
            </p>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-4">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={step === 1 ? `pin-${index}` : `confirm-pin-${index}`}
                    type="password"
                    maxLength="1"
                    value={step === 1 ? pin[index] : confirmPin[index]}
                    onChange={step === 1 
                      ? (e) => handlePinChange(e, index) 
                      : (e) => handleConfirmPinChange(e, index)}
                    className="w-16 h-16 text-center text-[24px] border border-[#9E9E9E] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || (step === 2 && confirmPin.some(digit => !digit))}
                className={`w-full py-3 px-4 text-white text-[16px] font-medium rounded-md ${
                  loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading 
                  ? 'Processing...' 
                  : step === 1 ? 'Continue' : 'Confirm PIN'}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="w-full text-center text-indigo-600 hover:text-indigo-500 text-[16px] font-medium"
                >
                  Back to create PIN
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src={Family}
          alt="Family enjoying savings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="max-w-md mx-auto text-center text-white">
            <h2 className="text-[24px] font-bold mb-2">Secure Your Account</h2>
            <p className="text-[16px]">
              Your PIN adds an extra layer of security to protect your savings and transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;