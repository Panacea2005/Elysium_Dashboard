import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ControlSlider from './ControlSlider';
import { FaFan, FaTint, FaLightbulb, FaSun, FaMoon } from 'react-icons/fa';
Chart.register(...registerables);

const ControlPanel = ({ settings, onSettingChange, darkMode }) => {
  const chartRef = useRef(null);
  const [ventilationOn, setVentilationOn] = useState(false);
  const [waterOn, setWaterOn] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
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
        tension: 0.2,
      },
      {
        label: 'Humidity (%)',
        data: Array.from({ length: 60 }, () => Math.random() * (80 - 65) + 65),
        borderColor: (ctx) => createGradient(ctx.chart.ctx, 'rgba(0, 0, 255, 0.6)', 'rgba(0, 191, 255, 0.6)'),
        borderWidth: 2,
        fill: false,
        tension: 0.2,
      },
      {
        label: 'Light Intensity (lux)',
        data: Array.from({ length: 60 }, () => Math.random() * (1200 - 850) + 850),
        borderColor: (ctx) => createGradient(ctx.chart.ctx, 'rgba(255, 255, 0, 0.6)', 'rgba(255, 215, 0, 0.6)'),
        borderWidth: 2,
        fill: false,
        tension: 0.2,
      },
    ],
  });

  const chartOptions = {
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        display: true,
        type: 'linear',
        min: 0,
        max: 60,
        ticks: {
          stepSize: 2,
          color: tickColor,
          callback: function (value) {
            return value + 's';
          }
        },
        grid: {
          color: gridColor,
        }
      },
      y: {
        display: true,
        ticks: {
          color: tickColor,
        },
        grid: {
          color: gridColor,
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          color: legendColor,
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
        newLightData.push(Math.random() * (1200 - 850) + 850);

        return {
          ...prevData,
          datasets: [
            { ...prevData.datasets[0], data: newTempData },
            { ...prevData.datasets[1], data: newHumidityData },
            { ...prevData.datasets[2], data: newLightData },
          ],
        };
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Control Panel</h3>
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
      </div>

      <div className="space-y-4">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Additional Controls</h3>
        <ControlSlider
          label="CO2 Levels"
          value={settings.co2levels || 412}
          min={0}
          max={1200}
          onChange={(value) => onSettingChange('co2levels', value)}
          unit="ppm"
          darkMode={darkMode}
        />
        <ControlSlider
          label="Fan Speed"
          value={settings.fanspeed || 2.3}
          min={0}
          max={4}
          step={0.1}
          onChange={(value) => onSettingChange('fanspeed', value)}
          unit="m/s"
          darkMode={darkMode}
        />
      </div>

      <div className="space-y-4">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setVentilationOn(!ventilationOn)}
            className={`px-6 py-4 flex items-center space-x-2 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'} rounded-lg hover:scale-110 transition-transform`}
          >
            <FaFan />
            <span>{ventilationOn ? 'Turn Off Ventilation' : 'Ventilate Now'}</span>
          </button>
          <button
            onClick={() => setWaterOn(!waterOn)}
            className={`px-6 py-4 flex items-center space-x-2 ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'} rounded-lg hover:scale-110 transition-transform`}
          >
            <FaTint />
            <span>{waterOn ? 'Turn Off Water' : 'Water Plants'}</span>
          </button>
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`px-6 py-4 flex items-center space-x-2 ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700'} rounded-lg hover:scale-110 transition-transform`}
          >
            <FaLightbulb />
            <span>{lightsOn ? 'Turn Off Lights' : 'Toggle Lights'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lighting Schedule</h3>
          <div className="flex items-center space-x-4">
            <FaSun className={`text-2xl ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
            <div className="flex flex-col w-full">
              <label className={`block ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lights On</label>
              <input
                type="time"
                value={lightSchedule.on}
                onChange={(e) => setLightSchedule({ ...lightSchedule, on: e.target.value })}
                className={`p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMoon className={`text-2xl ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} />
            <div className="flex flex-col w-full">
              <label className={`block ${darkMode ? 'text-white' : 'text-gray-800'}`}>Lights Off</label>
              <input
                type="time"
                value={lightSchedule.off}
                onChange={(e) => setLightSchedule({ ...lightSchedule, off: e.target.value })}
                className={`p-2 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2 space-y-4">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Real-Time Statistics</h3>
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
