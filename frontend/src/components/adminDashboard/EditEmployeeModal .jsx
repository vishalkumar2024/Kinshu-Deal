import React from 'react';
import { X, Save } from 'lucide-react';
import EmployeeForm from './EmployeeForm';

const EditEmployeeModal = ({ selectedEmployee, setSelectedEmployee, handleSaveEdit, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Edit Employee Details</h3>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto py-2 px-1">
          <EmployeeForm 
            employee={selectedEmployee}
            setEmployee={setSelectedEmployee} 
          />
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button 
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSaveEdit}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;