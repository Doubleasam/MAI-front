import React from "react";
import ProfileForm from "./ProfileForm";
import BankDetailsForm from "./BankDetailsForm";
import PasswordSecurity from "./PasswordSecurity";
import NotificationSettings from "./NotificationSettings";
import Wallet from "./Wallet";

const ProfileContent = ({ activeTab, user, updateProfile, darkMode, setError, setSuccess }) => {
  return (
    <section 
      className={`w-full md:w-3/4 p-1 rounded-lg shadow-lg ml-0 md:ml-6 mt-4 md:mt-0 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      style={{ overflow: 'hidden', maxWidth: '100%' }}
    >
      {activeTab === "profile" && (
        <ProfileForm 
          user={user} 
          updateProfile={updateProfile} 
          darkMode={darkMode} 
          setError={setError} 
          setSuccess={setSuccess} 
        />
      )}
      {activeTab === "bank" && (
        <BankDetailsForm 
          darkMode={darkMode} 
          setError={setError} 
          setSuccess={setSuccess} 
        />
      )}
      {activeTab === "security" && (
        <PasswordSecurity 
          updateProfile={updateProfile} 
          darkMode={darkMode} 
          setError={setError} 
          setSuccess={setSuccess} 
        />
      )}
      {activeTab === "notifications" && (
        <NotificationSettings 
          darkMode={darkMode} 
        />
      )}
      {activeTab === "wallet" && (
        <Wallet 
          darkMode={darkMode} 
          setError={setError} 
          setSuccess={setSuccess} 
        />
      )}
    </section>
  );
};

export default ProfileContent;