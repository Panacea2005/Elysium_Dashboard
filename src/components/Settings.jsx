import React from 'react';

const Settings = ({ darkMode, setDarkMode }) => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-8">Settings</h1>
    
    {/* Basic Settings Section */}
    <div className={`mb-8 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-6">Basic Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select className={`w-full max-w-xs p-2 rounded-md border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <select 
            className={`w-full max-w-xs p-2 rounded-md border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
            value={darkMode ? 'dark' : 'light'}
            onChange={(e) => setDarkMode(e.target.value === 'dark')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time Zone</label>
          <select className={`w-full max-w-xs p-2 rounded-md border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}>
            <option>UTC (GMT+0)</option>
            <option>EST (GMT-5)</option>
            <option>PST (GMT-8)</option>
          </select>
        </div>
      </div>
    </div>

    {/* Technical Settings Section */}
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-6">Technical Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Data Refresh Rate</label>
          <select className={`w-full max-w-xs p-2 rounded-md border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
          }`}>
            <option>5 seconds</option>
            <option>10 seconds</option>
            <option>30 seconds</option>
            <option>1 minute</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Temperature Unit</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="temp-unit" className="mr-2" />
              Celsius
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="temp-unit" className="mr-2" />
              Fahrenheit
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Alert Preferences</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Critical System Alerts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Maintenance Records
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Performance Reports
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
