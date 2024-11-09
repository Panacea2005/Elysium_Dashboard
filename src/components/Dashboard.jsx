import React, { useState, useEffect } from 'react';
import { FaThermometerHalf, FaWater, FaSun, FaLeaf, FaWind, FaMoon, FaHome, FaCog, FaUser, FaBars, FaSignOutAlt, FaExclamationTriangle, FaTools, FaFileAlt, FaSearch } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { Radar } from 'react-chartjs-2';
import StatusCard from './StatusCard';
import SystemStatus from './SystemStatus';
import ControlPanel from './ControlPanel';
import Alerts from './Alerts';
import MaintenanceRecord from './MaintenanceRecords';
import Account from './Account';
import Settings from './Settings';
import PerformanceReport from './PerformanceReports';
import logo from '/Logo.png';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settings, setSettings] = useState({
    temperature: 24,
    humidity: 65,
    lightIntensity: 85
  });

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const environmentalData = [
    { time: '00:00', temperature: 23, humidity: 65, light: 0 },
    { time: '04:00', temperature: 22, humidity: 68, light: 0 },
    { time: '08:00', temperature: 24, humidity: 62, light: 75 },
    { time: '12:00', temperature: 26, humidity: 60, light: 100 },
    { time: '16:00', temperature: 25, humidity: 63, light: 85 },
    { time: '20:00', temperature: 21, humidity: 63, light: 70 },
  ];

  const data = {
    labels: ['Temperature (°C)', 'Humidity (%)', 'Light (lux)', 'CO2 (ppm)', 'Airflow (m/s)'],
    datasets: [
      {
        label: 'Current',
        data: [24, 65, 850, 412, 2.3].map((value, index) => (value / [30, 80, 1000, 1200, 4][index]) * 100),
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 1,
      },
      {
        label: 'Ideal',
        data: [26, 70, 900, 800, 3].map((value, index) => (value / [30, 80, 1000, 1200, 4][index]) * 100),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        },
        ticks: {
          backdropColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          callback: function (value) {
            return value + '%';
          },
          min: 0,
          max: 100,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        },
      },
    },
  };

  const navItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard' },
    { id: 'alerts', icon: FaExclamationTriangle, label: 'Alerts' },
    { id: 'maintenance', icon: FaTools, label: 'Maintenance Records' },
    { id: 'performance', icon: FaFileAlt, label: 'Performance Reports' },
    { id: 'settings', icon: FaCog, label: 'Settings' },
    { id: 'account', icon: FaUser, label: 'Account' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navigation Sidebar */}
      <div className={`fixed left-0 top-0 h-full shadow-xl transition-all duration-300 z-40 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="w-64 h-full flex flex-col">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Elysium Logo" className="w-7 h-7" />
              <span className="text-xl font-bold">Elysium</span>
            </div>
          </div>

          <nav className="flex-1">
            <div className="px-4 space-y-2">
              <div className="flex flex-col items-center space-y-2 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FaUser className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${activeTab === id
                      ? (darkMode ? 'bg-gray-800 text-emerald-400' : 'bg-emerald-50 text-emerald-700 font-semibold')
                      : (darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Log Out Button */}
          <div className="p-4">
            <button
              onClick={() => console.log('Logging out...')} // Replace with actual logout logic
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${darkMode
                  ? 'text-red-400 hover:bg-gray-800 hover:text-red-300'
                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'}
              `}
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:ml-64 p-6">
        {activeTab === 'dashboard' && (
          <div>
            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                  <img src={logo} alt="Elysium Logo" className="h-12 w-auto" />
                  <div>
                    <h1 className="text-3xl font-bold">Elysium Greenhouse Dashboard</h1>
                    <h2 className="text-xl text-gray-500">Oct 30, WED</h2>
                  </div>
                </div>

                {/* Theme Toggle Button in Top Right Corner */}
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <button onClick={toggleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5em' }}>
                    <FaSearch />
                  </button>
                  {searchVisible && (
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{
                        display: 'block',
                        marginTop: '10px',
                        padding: '5px',
                        fontSize: '1em'
                      }}
                    />
                  )}
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                    System Status: Optimal
                  </span>
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    {darkMode ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                <StatusCard
                  icon={<FaThermometerHalf />}
                  title="Temperature"
                  value="24°C"
                  status="Optimal"
                  trend="+1.2°C"
                  trendDirection="up"
                  darkMode={darkMode}
                />
                <StatusCard
                  icon={<FaWater />}
                  title="Humidity"
                  value="65%"
                  status="Normal"
                  trend="-2%"
                  trendDirection="down"
                  darkMode={darkMode}
                />
                <StatusCard
                  icon={<FaSun />}
                  title="Light Intensity"
                  value="850 lux"
                  status="High"
                  trend="+50 lux"
                  trendDirection="up"
                  darkMode={darkMode}
                />
                <StatusCard
                  icon={<FaLeaf />}
                  title="CO2 Levels"
                  value="412 ppm"
                  status="Normal"
                  trend="+5 ppm"
                  trendDirection="up"
                  darkMode={darkMode}
                />
                <StatusCard
                  icon={<FaWind />}
                  title="Air Flow"
                  value="2.3 m/s"
                  status="Optimal"
                  trend="-0.1 m/s"
                  trendDirection="down"
                  darkMode={darkMode}
                />
              </div>

              {/* Charts and System Performance Section */}
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Left Column: Charts and Statistics */}
                <div className="flex-1 flex flex-col">
                  {/* Chart Section */}
                  <div className={`p-6 rounded-lg shadow-lg mb-6 flex-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl font-semibold mb-4">Environmental Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={environmentalData}>
                        {/* Cartesian Grid with darker stroke for dark mode */}
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />

                        {/* X and Y Axes with conditional stroke */}
                        <XAxis dataKey="time" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                        <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />

                        {/* Tooltip with dynamic dark mode styles */}
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: darkMode ? '#1F2937' : 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <RechartsLegend />

                        {/* Temperature Line with Gradient */}
                        <defs>
                          <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00c6ff" />
                            <stop offset="100%" stopColor="#0072ff" />
                          </linearGradient>

                          {/* Humidity Line with Gradient */}
                          <linearGradient id="humGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00ff99" />
                            <stop offset="100%" stopColor="#007f66" />
                          </linearGradient>

                          {/* Light Intensity Line with Gradient */}
                          <linearGradient id="lightGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffd700" />
                            <stop offset="100%" stopColor="#ff4500" />
                          </linearGradient>
                        </defs>

                        {/* Line for Temperature with Gradient Stroke */}
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="url(#tempGradient)"
                          strokeWidth={2}
                          dot={{ fill: '#00c6ff', stroke: '#0072ff', strokeWidth: 2 }}
                        />

                        {/* Line for Humidity with Gradient Stroke */}
                        <Line
                          type="monotone"
                          dataKey="humidity"
                          stroke="url(#humGradient)"
                          strokeWidth={2}
                          dot={{ fill: '#00ff99', stroke: '#007f66', strokeWidth: 2 }}
                        />

                        {/* Line for Light Intensity with Gradient Stroke */}
                        <Line
                          type="monotone"
                          dataKey="light"
                          stroke="url(#lightGradient)"
                          strokeWidth={2}
                          dot={{ fill: '#ffd700', stroke: '#ff4500', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Radar Chart Section */}
                  <div className={`p-6 rounded-lg shadow-lg flex-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl font-semibold mb-2">Detailed Statistics</h2>
                      <Radar data={data} options={options} />
                  </div>
                </div>

                {/* Right Column: System Performance */}
                <div className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                  <h2 className="text-xl font-semibold mb-4">System Performance</h2>
                  <SystemStatus darkMode={darkMode} />
                </div>
              </div>

              {/* Control Panel */}
              <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <h2 className="text-xl font-semibold mb-4">Control Panel</h2>
                <ControlPanel settings={settings} onSettingChange={handleSettingChange} darkMode={darkMode} />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'alerts' && <Alerts darkMode={darkMode} />}
        {activeTab === 'maintenance' && <MaintenanceRecord darkMode={darkMode} />}
        {activeTab === 'settings' && <Settings darkMode={darkMode} />}
        {activeTab === 'account' && <Account darkMode={darkMode} />}
        {activeTab === 'performance' && <PerformanceReport darkMode={darkMode} />}
      </div>
    </div>
  );
};

export default Dashboard;
