import React from 'react';
import { FaFilePdf, FaPrint } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PerformanceReport = ({ darkMode }) => {
  const handleGeneratePDF = () => {
    // Logic to generate PDF report
    console.log('Generating PDF report...');
    alert('PDF report generated successfully!');
  };

  const handlePrintReport = () => {
    // Logic to print the report
    console.log('Printing report...');
    window.print();
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Temperature',
        data: [30, 25, 27, 28, 26, 29, 31],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Humidity',
        data: [70, 65, 68, 72, 75, 78, 80],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Light Intensity',
        data: [800, 820, 850, 870, 900, 950, 1000],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? 'white' : 'black',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? 'white' : 'black',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: darkMode ? 'white' : 'black',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const calculateAverage = (arr) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const calculateMax = (arr) => Math.max(...arr);
  const calculateMin = (arr) => Math.min(...arr);

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-semibold mb-4">Performance Report</h2>
      <p className="mb-4">Generate and print detailed performance reports for the greenhouse.</p>
      
      <div className="mb-6">
        <Line data={data} options={options} />
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Performance Data</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={`${darkMode ? 'text-white' : 'text-black'}`}>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Month</th>
              {data.labels.map((label, index) => (
                <th key={index} className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Temperature (°C)</td>
              {data.datasets[0].data.map((value, index) => (
                <td key={index} className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{value}</td>
              ))}
            </tr>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Humidity (%)</td>
              {data.datasets[1].data.map((value, index) => (
                <td key={index} className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{value}</td>
              ))}
            </tr>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Light Intensity (lux)</td>
              {data.datasets[2].data.map((value, index) => (
                <td key={index} className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Statistics</h3>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={`${darkMode ? 'text-white' : 'text-black'}`}>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Metric</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Temperature</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Humidity</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Light Intensity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Average</td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{calculateAverage(data.datasets[0].data)}°C</td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{calculateAverage(data.datasets[1].data)}%</td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{calculateAverage(data.datasets[2].data)} lux</td>
            </tr>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Max</td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{calculateMax(data.datasets[0].data)}°C</td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{calculateMax(data.datasets[1].data)}%</td>
              <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{calculateMax(data.datasets[2].data)} lux</td>
            </tr>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4">Min</td>
              <td className="py-2 px-4">{calculateMin(data.datasets[0].data)}°C</td>
              <td className="py-2 px-4">{calculateMin(data.datasets[1].data)}%</td>
              <td className="py-2 px-4">{calculateMin(data.datasets[2].data)} lux</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex space-x-4">
        <button 
          onClick={handleGeneratePDF} 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}
        >
          <FaFilePdf />
          <span>Generate PDF</span>
        </button>
        <button 
          onClick={handlePrintReport} 
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}
        >
          <FaPrint />
          <span>Print Report</span>
        </button>
      </div>
    </div>
  );
};

export default PerformanceReport;