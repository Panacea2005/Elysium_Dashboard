import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ControlSlider from './ControlSlider';
Chart.register(...registerables);

const ControlPanel = ({ settings, onSettingChange, darkMode }) => {
  const chartRef = useRef(null);
  const [ventilationOn, setVentilationOn] = useState(false);
  const [waterOn, setWaterOn] = useState(false);
  const [lightSchedule, setLightSchedule] = useState({
    on: '06:00 AM',
    off: '06:00 PM'
  });

  const createGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const tickColor = darkMode ? '#ffffff' : '#000000';
  const legendColor = darkMode ? '#ffffff' : '#000000';

  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 60 }, (_, i) => i),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: Array.from({ length: 60 }, () => Math.random() * (30 - 24) + 24),
        borderColor: (ctx) => createGradient(ctx.chart.ctx, 'rgba(255, 165, 0, 0.6)', 'rgba(255, 69, 0, 0.6)'),
        borderWidth: 2,
        fill: false,
        tension: 0.2, // Less wavy
      },
      {
        label: 'Humidity (%)',
        data: Array.from({ length: 60 }, () => Math.random() * (30 - 24) + 24),
        borderColor: (ctx) => createGradient(ctx.chart.ctx, 'rgba(0, 0, 255, 0.6)', 'rgba(0, 191, 255, 0.6)'),
        borderWidth: 2,
        fill: false,
        tension: 0.2, // Less wavy
      },
      {
        label: 'Light Intensity (lux)',
        data: Array.from({ length: 60 }, () => Math.random() * (1200 - 850) + 850),
        borderColor: (ctx) => createGradient(ctx.chart.ctx, 'rgba(255, 255, 0, 0.6)', 'rgba(255, 215, 0, 0.6)'),
        borderWidth: 2,
        fill: false,
        tension: 0.2, // Less wavy
      },
    ],
  });

  const chartOptions = {
    animation: {
      duration: 0, // Disable initial animation
    },
    scales: {
      x: {
        display: true,
        type: 'linear',
        min: 0,
        max: 60,
        ticks: {
          stepSize: 2,
          color: tickColor, // Dynamic color for better visibility
          callback: function(value) {
            return value + 's'; // Display seconds
          }
        },
        grid: {
          color: gridColor, // Dynamic grid lines color
        }
      },
      y: {
        display: true,
        ticks: {
          color: tickColor, // Dynamic color for better visibility
        },
        grid: {
          color: gridColor, // Dynamic grid lines color
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          color: legendColor, // Dynamic color for legend text
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newTempData = [...prevData.datasets[0].data];
        const newHumidityData = [...prevData.datasets[1].data];
        const newLightData = [...prevData.datasets[2].data];

        newTempData.shift();
        newTempData.push(Math.random() * (30 - 24) + 24);

        newHumidityData.shift();
        newHumidityData.push(Math.random() * (80 - 65) + 65);

        newLightData.shift();
        newLightData.push(Math.random() * (900 - 850) + 850);

        return {
          ...prevData,
          datasets: [
            { ...prevData.datasets[0], data: newTempData },
            { ...prevData.datasets[1], data: newHumidityData },
            { ...prevData.datasets[2], data: newLightData },
          ],
        };
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Sliders for controlling temperature, humidity, and light intensity */}
      <ControlSlider 
        label="Temperature Control"
        value={settings.temperature}
        min={18}
        max={30}
        onChange={(value) => onSettingChange('temperature', value)}
        unit="°C"
        darkMode={darkMode}
      />
      <ControlSlider 
        label="Humidity Control"
        value={settings.humidity}
        min={40}
        max={80}
        onChange={(value) => onSettingChange('humidity', value)}
        unit="%"
        darkMode={darkMode}
      />
      <ControlSlider 
        label="Light Intensity"
        value={settings.lightIntensity}
        min={0}
        max={100}
        onChange={(value) => onSettingChange('lightIntensity', value)}
        unit="%"
        darkMode={darkMode}
      />

      {/* Quick actions section */}
      <div className="space-y-2">
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setVentilationOn(!ventilationOn)}
            className={`px-3 py-2 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'} rounded-lg hover:opacity-80`}
          >
            {ventilationOn ? 'Turn Off Ventilation' : 'Ventilate Now'}
          </button>
          <button 
            onClick={() => setWaterOn(!waterOn)}
            className={`px-3 py-2 ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'} rounded-lg hover:opacity-80`}
          >
            {waterOn ? 'Turn Off Water' : 'Water Plants'}
          </button>
        </div>
      </div>

      {/* Lighting Schedule Section */}
      <div className="space-y-2">
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lighting Schedule</h3>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className={`block ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lights On</label>
            <input 
              type="time" 
              value={lightSchedule.on}
              onChange={(e) => setLightSchedule({...lightSchedule, on: e.target.value})}
              className={`p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className={`block ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lights Off</label>
            <input 
              type="time" 
              value={lightSchedule.off}
              onChange={(e) => setLightSchedule({...lightSchedule, off: e.target.value})}
              className={`p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Real-Time Statistics</h3>
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
