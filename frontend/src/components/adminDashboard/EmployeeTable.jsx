'use client';

import { Edit2 } from "lucide-react";
import SortableTableHeader from "./SortableTableHeader ";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees, handleEditEmployee, sortConfig, requestSort }) => {


  // Function to handle row click to navigate
  const handleRowClick = (employee) => {
    // This function intentionally left empty as we're using the Link inside the row now
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <SortableTableHeader
                label="Employee Code"
                fieldKey="employeeCode"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableTableHeader 
                label="Name"
                fieldKey="name"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableTableHeader 
                label="Email"
                fieldKey="email"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <SortableTableHeader 
                label="Medical Card No."
                fieldKey="medicalCardNo"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableTableHeader 
                label="Balance"
                fieldKey="balance"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr 
                  key={employee._id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(employee)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.user.employeeCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.user.medicalCardNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{employee.user.balance.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center">
                    <Link 
                      to="/admin/txn" 
                      state={employee}
                      className="text-blue-600 hover:text-blue-800 ml-2"
                      onClick={(e) => e.stopPropagation()} // Prevent row click from firing
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;