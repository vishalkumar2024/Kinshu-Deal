import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard</h2>
      <p className="text-gray-600">Manage ex-employees and their medical card transactions</p>
    </div>
  );
};

export default DashboardHeader;