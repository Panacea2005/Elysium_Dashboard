import React from 'react';
import { FaUser } from 'react-icons/fa';

const Account = ({ darkMode }) => (
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
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input 
            type="text" 
            className={`w-full max-w-md p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            className={`w-full max-w-md p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input 
            type="text" 
            className={`w-full max-w-md p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
            value="System Administrator"
            disabled
          />
        </div>
      </div>
    </div>

    {/* Security Section */}
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-6">Security</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Current Password</label>
          <input 
            type="password" 
            className={`w-full max-w-md p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input 
            type="password" 
            className={`w-full max-w-md p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          />
        </div>
        <div>
          <button className={`px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Account;
