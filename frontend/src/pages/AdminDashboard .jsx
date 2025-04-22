import React, { useState, useEffect } from 'react';
import ActionButtons from '../components/adminDashboard/ActionButtons';
import EmployeeTable from '../components/adminDashboard/EmployeeTable';
import DashboardHeader from '../components/adminDashboard/DashboardHeader';
import EditEmployeeModal from '../components/adminDashboard/EditEmployeeModal ';
import AddEmployeeModal from '../components/adminDashboard/AddEmployeeModal ';
import axios from 'axios';
import config from '../config/config';
import { toast } from 'react-toastify';

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
    balance: 0,
    role:'user',
    password:''
  });

  useEffect(() => {
    const fetchTxn = async () => {
      try {
        axios.get(`${config.API_URL}/api/transaction`, { withCredentials: true })
          .then(({data}) => {
            setEmployees(data.data);
          })
          .catch((error) => {
            console.error('Error fetching transactions:', error);
          });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTxn();
  },[]);

  const filteredEmployees = employees.filter(employee =>
    employee.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.user?.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.user?.medicalCardNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
    axios.post(`${config.API_URL}/api/user`,newEmployee, { withCredentials: true })
      .then(({data}) => {
        setEmployees([...employees, {user:data.data}]);
        setIsAddEmployeeModalOpen(false);
        setNewEmployee({
          name: '',
          email: '',
          employeeCode: '',
          address: '',
          medicalCardNo: '',
          balance: 0,
          role:'user',
          password:''
        });  
      })
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setEmployees(employees.map(emp =>
      emp._id === selectedEmployee._id ? selectedEmployee : emp
    ));
    setIsEditModalOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      toast.success(`File "${file.name}" uploaded successfully. In a real application, this would process the transaction data.`);
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