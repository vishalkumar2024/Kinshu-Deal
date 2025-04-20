import React from 'react';

const EmployeeForm = ({ employee, setEmployee }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={employee.name}
          onChange={(e) => setEmployee({...employee, name: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={employee.email}
          onChange={(e) => setEmployee({...employee, email: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Code</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={employee.employeeCode}
          onChange={(e) => setEmployee({...employee, employeeCode: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={employee.address}
          onChange={(e) => setEmployee({...employee, address: e.target.value})}
          rows="2"
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Medical Card No.</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={employee.medicalCardNo}
          onChange={(e) => setEmployee({...employee, medicalCardNo: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
        <input 
          type="number" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={employee.balance}
          onChange={(e) => setEmployee({...employee, balance: parseFloat(e.target.value) || 0})}
        />
      </div>
    </div>
  );
};

export default EmployeeForm;