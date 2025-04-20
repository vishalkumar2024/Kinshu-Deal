import React from 'react';
import { Search, Upload, UserPlus } from 'lucide-react';

const ActionButtons = ({ searchTerm, setSearchTerm, handleFileUpload, openAddModal }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <div className="relative mb-4 md:mb-0">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder="Search employees..." 
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition duration-300">
          <Upload size={20} />
          <span>Upload Transaction Dump</span>
          <input 
            type="file" 
            accept=".xlsx,.csv" 
            className="hidden" 
            onChange={handleFileUpload}
          />
        </label>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={openAddModal}
        >
          <UserPlus size={20} />
          <span>Add Employee</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;