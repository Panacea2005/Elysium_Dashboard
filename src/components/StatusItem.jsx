import React from 'react';

const StatusItem = ({ label, status }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium">{label}</span>
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
        {status}
      </span>
    </div>
  );
};

export default StatusItem;
