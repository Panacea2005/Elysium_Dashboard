import React, { useState } from 'react';
import Account from './Account';

const Settings = ({ darkMode, setDarkMode }) => {
  const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC (GMT+0)');
  const [notifications, setNotifications] = useState(true);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [activeTab, setActiveTab] = useState('basic');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="mb-4">
        <button
          className={`mr-4 ${activeTab === 'basic' ? 'font-bold' : ''}`}
          onClick={() => handleTabChange('basic')}
        >
          Basic Settings
        </button>
        <button
          className={`mr-4 ${activeTab === 'account' ? 'font-bold' : ''}`}
          onClick={() => handleTabChange('account')}
        >
          Account Settings
        </button>
      </div>
      {activeTab === 'basic' && (
        <div className={`mb-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <h2 className="text-xl font-semibold mb-6">Basic Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={darkMode ? 'dark' : 'light'}
                onChange={(e) => setDarkMode(e.target.value === 'dark')}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Zone</label>
              <select
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <option>VN (GMT+7)</option>
                <option>UTC (GMT+0)</option>
                <option>EST (GMT-5)</option>
                <option>PST (GMT-8)</option>
                <option>CET (GMT+1)</option>
                <option>IST (GMT+5:30)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notifications</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className={`mr-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                <span>{notifications ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Temperature Unit</label>
              <select
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                value={temperatureUnit}
                onChange={(e) => setTemperatureUnit(e.target.value)}
              >
                <option value="Celsius">Celsius</option>
                <option value="Fahrenheit">Fahrenheit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Account Settings</label>
              <button
                className={`w-full max-w-xs p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                onClick={() => handleTabChange('account')}
              >
                Manage Account
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'account' && <Account darkMode={darkMode} />}
    </div>
  );
};

export default Settings;
