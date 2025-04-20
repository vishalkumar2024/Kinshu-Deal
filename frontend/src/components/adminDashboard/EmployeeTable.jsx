import { Edit2 } from "lucide-react";
import SortableTableHeader from "./SortableTableHeader ";

const EmployeeTable = ({ employees, handleEditEmployee, sortConfig, requestSort }) => {
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
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{employee.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.medicalCardNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${employee.balance.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button 
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <Edit2 size={18} />
                    </button>
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