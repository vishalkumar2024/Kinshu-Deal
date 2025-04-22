import React from 'react';
import { Search, Upload, UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({ searchTerm, setSearchTerm, handleFileUpload, openAddModal }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <div className="relative mb-4 md:mb-0">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder="Search Transactions..." 
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          onClick={()=> navigate('/admin/allUsers')}
        >
          <Users size={20} />
          <span>Show All Employees</span>
        </button>
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
      </div>
    </div>
  );
};

export default ActionButtons;