import React, { useState, useEffect } from 'react';
import ActionButtons from '../components/adminDashboard/ActionButtons';
import EmployeeTable from '../components/adminDashboard/EmployeeTable';
import DashboardHeader from '../components/adminDashboard/DashboardHeader';
import EditEmployeeModal from '../components/adminDashboard/EditEmployeeModal ';
import AddEmployeeModal from '../components/adminDashboard/AddEmployeeModal ';
import axios from 'axios';
import config from '../config/config';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'employeeCode', direction: 'ascending' });
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    employeeCode: '',
    address: '',
    medicalCardNo: '',
    balance: 0
  });

  useEffect(() => {
    const mockEmployees = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', employeeCode: 'EMP001', address: '123 Main St, City', medicalCardNo: 'MC001', balance: 5000 },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', employeeCode: 'EMP002', address: '456 Oak Ave, Town', medicalCardNo: 'MC002', balance: 3500 },
      { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com', employeeCode: 'EMP003', address: '789 Pine Rd, Village', medicalCardNo: 'MC003', balance: 4200 },
      { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', employeeCode: 'EMP004', address: '101 Maple Dr, County', medicalCardNo: 'MC004', balance: 2800 },
      { id: 5, name: 'Michael Wilson', email: 'michael.wilson@example.com', employeeCode: 'EMP005', address: '202 Cedar Ln, District', medicalCardNo: 'MC005', balance: 6100 },
    ];
    setEmployees(mockEmployees);
    const fetchEmployees = async () => {
      try {
        const {data}=await axios.get(`${config.API_URL}/api/transaction`,{ withCredentials: true });
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.medicalCardNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleAddEmployee = () => {
    const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const employeeToAdd = { ...newEmployee, id: newId };
    setEmployees([...employees, employeeToAdd]);
    setIsAddEmployeeModalOpen(false);
    setNewEmployee({
      name: '',
      email: '',
      employeeCode: '',
      address: '',
      medicalCardNo: '',
      balance: 0
    });
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setEmployees(employees.map(emp =>
      emp.id === selectedEmployee.id ? selectedEmployee : emp
    ));
    setIsEditModalOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File "${file.name}" uploaded successfully. In a real application, this would process the transaction data.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="container mx-auto py-8 px-4">
        <DashboardHeader />

        <ActionButtons
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleFileUpload={handleFileUpload}
          openAddModal={() => setIsAddEmployeeModalOpen(true)}
        />

        <EmployeeTable
          employees={sortedEmployees}
          handleEditEmployee={handleEditEmployee}
          sortConfig={sortConfig}
          requestSort={requestSort}
        />
      </div>

      {isAddEmployeeModalOpen && (
        <AddEmployeeModal
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          handleAddEmployee={handleAddEmployee}
          closeModal={() => setIsAddEmployeeModalOpen(false)}
        />
      )}

      {isEditModalOpen && selectedEmployee && (
        <EditEmployeeModal
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          handleSaveEdit={handleSaveEdit}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;