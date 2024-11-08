import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const Account = ({ darkMode }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || 'JohnDoe');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'johndoe@example.com');
  const [password, setPassword] = useState(localStorage.getItem('password') || 'elysiumadmin');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }, [username, email, password]);

  const handleSaveAccount = () => {
    setIsEditingAccount(false);
  };

  const handleSavePassword = () => {
    setPassword(newPassword);
    setIsEditingPassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      {/* Profile Section */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <FaUser className="w-12 h-12 text-gray-400" />
            </div>
            <button className={`px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              Change Photo
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            {isEditingAccount ? (
              <input 
                type="text" 
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <div className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                {username}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            {isEditingAccount ? (
              <input 
                type="email" 
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                {email}
              </div>
            )}
          </div>
          {isEditingAccount ? (
            <button 
              className={`w-full max-w-xs p-2 rounded-md ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-100 hover:bg-green-200'}`}
              onClick={handleSaveAccount}
            >
              Save Account
            </button>
          ) : (
            <button 
              className={`w-full max-w-xs p-2 rounded-md ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-100 hover:bg-blue-200'}`}
              onClick={() => setIsEditingAccount(true)}
            >
              Edit Account
            </button>
          )}
        </div>
      </div>

      {/* Password Section */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <div className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
              {password}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            {isEditingPassword ? (
              <input 
                type="password" 
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            ) : (
              <div className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                ********
              </div>
            )}
          </div>
          {isEditingPassword ? (
            <button 
              className={`w-full max-w-xs p-2 rounded-md ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-100 hover:bg-green-200'}`}
              onClick={handleSavePassword}
            >
              Update Password
            </button>
          ) : (
            <button 
              className={`w-full max-w-xs p-2 rounded-md ${darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-100 hover:bg-red-200'}`}
              onClick={() => setIsEditingPassword(true)}
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
