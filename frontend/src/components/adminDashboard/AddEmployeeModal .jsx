import React from 'react';
import { X } from 'lucide-react';
import EmployeeForm from './EmployeeForm';

const AddEmployeeModal = ({ newEmployee, setNewEmployee, handleAddEmployee, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Add New Employee</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            <X size={20} />
          </button>
        </div>
        
        <EmployeeForm 
          employee={newEmployee}
          setEmployee={setNewEmployee}
        />
        
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;