import React, { useState } from 'react';
import { FaExclamationTriangle, FaRegCheckCircle } from 'react-icons/fa';

const initialAlertsData = [
  { id: 1, type: 'Warning', message: 'Temperature is above optimal levels.', timestamp: '2023-10-27 14:32', actionTaken: false },
  { id: 2, type: 'Alert', message: 'Humidity levels are below threshold.', timestamp: '2023-10-27 14:45', actionTaken: false },
  { id: 3, type: 'Critical', message: 'CO2 levels are above safe limits.', timestamp: '2023-10-27 15:10', actionTaken: false },
];

const Alerts = ({ darkMode }) => {
  const [alerts, setAlerts] = useState(initialAlertsData);

  const handleAcknowledge = (id) => {
    setAlerts(prevAlerts => prevAlerts.map(alert => 
      alert.id === id ? { ...alert, actionTaken: true } : alert
    ));
  };

  const handleAction = (alert) => {
    if (alert.type === 'Critical') {
      console.log("Activating ventilation system...");
    } else if (alert.type === 'Warning') {
      console.log("Adjusting temperature to optimal levels...");
    } else if (alert.type === 'Alert') {
      console.log("Increasing humidity to safe levels...");
    }
    handleAcknowledge(alert.id);
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-semibold mb-4">System Alerts</h2>
      <div className="space-y-4">
        {alerts.length ? (
          alerts.map(alert => (
            <div
              key={alert.id}
              className={`flex flex-col p-4 rounded-lg border-l-4 mb-4
                ${alert.type === 'Critical' ? (darkMode ? 'border-red-400 bg-red-700' : 'border-red-500 bg-red-200') : 
                 alert.type === 'Warning' ? (darkMode ? 'border-yellow-400 bg-yellow-700' : 'border-yellow-500 bg-yellow-200') : 
                 (darkMode ? 'border-blue-400 bg-blue-700' : 'border-blue-500 bg-blue-200')}`}
            >
              <div className="flex items-start space-x-3">
                <FaExclamationTriangle className={`mt-1 ${alert.type === 'Critical' ? 'text-red-500' : 
                                                       alert.type === 'Warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                <div>
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{alert.type}</h4>
                  <p className={`${darkMode ? 'text-white' : 'text-black'}`}>{alert.message}</p>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{alert.timestamp}</span>
                </div>
              </div>

              {/* Recommended Action Section */}
              {!alert.actionTaken && (
                <div className="mt-4">
                  <h5 className="text-md font-semibold">Recommended Action:</h5>
                  <p className="mb-2">
                    {alert.type === 'Critical' && "Activate ventilation system to reduce CO2 levels."}
                    {alert.type === 'Warning' && "Adjust temperature to bring it within optimal range."}
                    {alert.type === 'Alert' && "Increase humidity to maintain safe levels."}
                  </p>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAction(alert)}
                      className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-md 
                        ${alert.type === 'Critical' ? 'bg-red-500 text-white hover:bg-red-600' : 
                         alert.type === 'Warning' ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 
                         'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      Take Action
                    </button>
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-4 py-2 text-sm rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              )}
              {alert.actionTaken && (
                <div className="mt-4 flex items-center space-x-2">
                  <FaRegCheckCircle className="text-green-500" />
                  <span className="text-sm font-semibold text-green-500">Action taken: Alert acknowledged</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No alerts at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;
