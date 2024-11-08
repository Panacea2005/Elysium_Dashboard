import React from 'react';

const ControlSlider = ({ label, value, min, max, step, onChange, unit, darkMode }) => {
  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} min-w-[60px]`}>
          {value}{unit}
        </span>
      </div>
    </div>
  );
};

export default ControlSlider;
