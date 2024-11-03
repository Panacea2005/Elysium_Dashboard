import React from 'react';

const MaintenanceRecord = ({ darkMode }) => {
  const maintenanceData = [
    { date: '2024-10-25', description: 'Replaced air filters', status: 'Completed' },
    { date: '2024-10-26', description: 'Updated firmware', status: 'Completed' },
    { date: '2024-10-27', description: 'Checked sensor calibration', status: 'Pending' },
    { date: '2024-10-28', description: 'Cleaned cooling fans', status: 'Completed' },
  ];

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-4">Maintenance Record</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maintenanceData.map((record, index) => (
              <tr key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {record.status}
                  </span>
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