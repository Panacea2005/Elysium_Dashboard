import React from 'react';

const StatusCard = ({ icon, title, value, status, trend, trendDirection, darkMode }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 transition-colors ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`text-2xl mr-3 ${
            darkMode ? 'text-blue-400' : 'text-blue-500'
          }`}>{icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>{status}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-sm ${
            trendDirection === 'up' 
              ? (darkMode ? 'text-green-400' : 'text-green-500')
              : (darkMode ? 'text-red-400' : 'text-red-500')
          }`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
