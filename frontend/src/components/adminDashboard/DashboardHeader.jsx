import React from 'react';
import { ClipboardList } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-indigo-500/10 rounded-lg backdrop-blur-sm transition-all hover:scale-105">
          <ClipboardList className="w-6 h-6 text-indigo-600" />
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Management portal for ex-employees and medical card transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;