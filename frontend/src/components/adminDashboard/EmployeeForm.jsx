import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const EmployeeForm = ({ employee, setEmployee }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={employee.name || ''}
          onChange={(e) => setEmployee({...employee, name: e.target.value})}
          placeholder="Enter full name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={employee.email || ''}
          onChange={(e) => setEmployee({...employee, email: e.target.value})}
          placeholder="example@company.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Code</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={employee.employeeCode || ''}
          onChange={(e) => setEmployee({...employee, employeeCode: e.target.value})}
          placeholder="EMP-12345"
        />
      </div>
      
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={employee.password || ''}
            onChange={(e) => setEmployee({...employee, password: e.target.value})}
            placeholder="Enter password"
          />
          <button 
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none" 
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
          value={employee.role || 'user'}
          onChange={(e) => setEmployee({...employee, role: e.target.value})}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={employee.address || ''}
          onChange={(e) => setEmployee({...employee, address: e.target.value})}
          rows="2"
          placeholder="Enter complete address"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Medical Card No.</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={employee.medicalCardNumber || employee.medicalCardNo || ''}
          onChange={(e) => setEmployee({...employee, medicalCardNumber: e.target.value, medicalCardNo: e.target.value})}
          placeholder="MC-12345"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">₹</span>
          <input 
            type="number" 
            className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={employee.balance || ''}
            onChange={(e) => setEmployee({...employee, balance: parseFloat(e.target.value) || 0})}
            placeholder="0"
            step="1"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;