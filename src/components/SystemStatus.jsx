import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line, LineChart, Bar, BarChart, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const SystemStatus = ({ darkMode }) => {
  const gradient = darkMode 
    ? 'linear-gradient(135deg, #00c6ff, #0072ff)' 
    : 'linear-gradient(135deg, #3f87a6, #ebf8e1)';

  const metrics = [
    { label: 'System Uptime', value: 99.9, chart: 'circle' },
    { label: 'Sensor Health', value: 98, chart: 'circle' },
  ];

  const lineChartData = [
    { name: '25/10', status: 90 },
    { name: '26/10', status: 95 },
    { name: '27/10', status: 98 },
    { name: '28/10', status: 96 },
    { name: '29/10', status: 97 },
    { name: '30/10', status: 99.9 },
  ];

  const barChartData = [
    { name: '00:00', CPU: 70, Memory: 60 },
    { name: '04:00', CPU: 75, Memory: 65 },
    { name: '08:00', CPU: 80, Memory: 70 },
    { name: '12:00', CPU: 85, Memory: 75 },
    { name: '16:00', CPU: 90, Memory: 80 },
    { name: '20:00', CPU: 95, Memory: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* Circle Charts for Uptime and Sensor Health */}
      <div className="grid grid-cols-2 gap-8">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col items-center">
            <div style={{ width: 120, height: 120 }}>
              <CircularProgressbar
                value={metric.value}
                text={`${metric.value}%`}
                styles={buildStyles({
                  pathColor: `url(#gradient-${index})`,
                  textColor: darkMode ? '#ffffff' : '#000000',
                  trailColor: darkMode ? '#4b5563' : '#d1d5db',
                })}
              />
            </div>
            <h3 className={`text-lg mt-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {metric.label}
            </h3>
          </div>
        ))}
      </div>

      {/* Line Chart for System Health */}
      <div className="p-6 rounded-lg shadow-lg" style={{ background: darkMode ? '#1f2937' : '#f9fafb' }}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>System Health Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : 'white', borderRadius: '0.5rem' }} />
            <Line type="monotone" dataKey="status" stroke="url(#gradient-line)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for CPU and Memory Usage */}
      <div className="p-6 rounded-lg shadow-lg" style={{ background: darkMode ? '#1f2937' : '#f9fafb' }}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>CPU and Memory Usage Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : 'white', borderRadius: '0.5rem' }} />
            <Legend />
            <Bar dataKey="CPU" fill="url(#gradient-cpu)" />
            <Bar dataKey="Memory" fill="url(#gradient-Memory)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Creative Network Status and Last Maintenance */}
      <div className="grid grid-cols-2 gap-8">
        <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Network Status</h3>
          <div className="flex justify-center items-center">
            <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <p className="text-2xl font-bold">
              Strong
            </p>
          </div>
        </div>
        <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last Maintenance</h3>
          <div className="flex justify-center items-center">
            <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-2xl font-bold">
              2 days ago
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Definition */}
      <svg width="0" height="0">
        <defs>
          {metrics.map((_, index) => (
            <linearGradient id={`gradient-${index}`} key={index}>
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
          ))}
          <linearGradient id="gradient-line">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
          <linearGradient id="gradient-cpu">
            <stop offset="0%" stopColor="#ff7e5f" />
            <stop offset="100%" stopColor="#feb47b" />
          </linearGradient>
          <linearGradient id="gradient-Memory">
            <stop offset="0%" stopColor="#6a11cb" />
            <stop offset="100%" stopColor="#2575fc" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SystemStatus;
