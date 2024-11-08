import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';

const MaintenanceRecord = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const maintenanceData = [
    { date: '2024-10-25', description: 'Replaced air filters', status: 'Completed' },
    { date: '2024-10-26', description: 'Updated firmware', status: 'Completed' },
    { date: '2024-10-27', description: 'Checked sensor calibration', status: 'Pending' },
    { date: '2024-10-28', description: 'Cleaned cooling fans', status: 'Completed' },
    { date: '2024-10-29', description: 'Lubricated moving parts', status: 'Completed' },
    { date: '2024-10-30', description: 'Replaced worn-out cables', status: 'Pending' },
    { date: '2024-10-31', description: 'Tested backup power', status: 'Completed' },
    { date: '2024-11-01', description: 'Inspected safety equipment', status: 'Completed' },
    { date: '2024-11-02', description: 'Updated software', status: 'Pending' },
    { date: '2024-11-03', description: 'Replaced batteries', status: 'Completed' },
  ];

  const filteredData = maintenanceData.filter(record =>
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-4">Maintenance Record</h2>
      <div className="mb-4 flex items-center">
        <FaSearch className={`mr-2 ${darkMode ? 'text-white' : 'text-black'}`} />
        <input
          type="text"
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200`}>
            {filteredData.map((record, index) => (
              <tr key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.status === 'Completed' ? (
                    <span className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      {record.status}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaTimesCircle className="text-red-500 mr-2" />
                      {record.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceRecord;