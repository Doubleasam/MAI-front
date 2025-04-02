import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Family from "../assets/Family.jpeg";

const CreatePin = () => {
  const [step, setStep] = useState(1); // 1 = Create PIN, 2 = Confirm PIN
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus to next input
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

    // Auto focus to next input
    if (value && index < 3) {
      document.getElementById(`confirm-pin-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      // Clear confirm PIN when moving to step 2
      setConfirmPin(['', '', '', '']);
      return;
    }

    // Verify PINs match
    if (pin.join('') !== confirmPin.join('')) {
      alert("PINs don't match!");
      return;
    }

    console.log('PIN created:', pin.join(''));
    // Add your PIN creation logic here
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Column - PIN Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
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

          {/* PIN Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PIN Inputs */}
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

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white text-[16px] font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {step === 1 ? 'Continue' : 'Confirm PIN'}
              </button>

              {/* Back link when confirming */}
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-indigo-600 hover:text-indigo-500 text-[16px] font-medium"
                >
                  Back to create PIN
                </button>
              )}
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