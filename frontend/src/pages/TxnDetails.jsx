import React, { useState, useEffect, useId } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, FileText, DollarSign, User, Mail, IdCard, MapPin, Award, Check, List, Loader } from 'lucide-react';
import axios from 'axios';
import config from '../config/config';
import { toast } from 'react-toastify';

const TxnDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passedAmount, setPassedAmount] = useState('');
  const [error, setError] = useState('');
  const [userTransactions, setUserTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setTransaction(location.state);
      if (location.state.passedAmount) {
        setPassedAmount(location.state.passedAmount.toString());
      }
      
      if (location.state.user && location.state.user._id) {
        fetchUserTransactions(location.state.user._id);
      }
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [location]);

  const fetchUserTransactions = async(userId) => {
    try {
      const {data} = await axios.get(`${config.API_URL}/api/transaction/user/${userId}`, {withCredentials: true});
      setUserTransactions(data.data);
    } catch (error) {
      console.error("Error fetching user transactions:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader size={40} className="mx-auto animate-spin text-blue-600 mb-4" />
          <div className="text-lg font-medium">Loading transaction details...</div>
        </div>
      </div>
    );
  }

  if (!transaction.ClaimedAmount) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">No transaction data found</div>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const approvalPercentage = transaction.ClaimedAmount > 0 
    ? (transaction.passedAmount / transaction.ClaimedAmount) * 100 
    : 0;

  const handleApproveClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleAmountChange = (e) => {
    setPassedAmount(e.target.value);
    setError('');
  };

  const handleSubmit = () => {
    const amount = parseFloat(passedAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (amount > transaction.ClaimedAmount) {
      setError('Approved amount cannot exceed claimed amount');
      return;
    }

    axios.put(`${config.API_URL}/api/transaction/${transaction._id}`,{passedAmount},{withCredentials:true})
    .then(({data})=>{
      toast.success('Transaction updated successfully!');
      
      const updatedTransaction = {
        ...transaction,
        passedAmount: amount
      };
      
      setTransaction(updatedTransaction);
      
      // Update location.state with the new transaction data
      navigate(location.pathname, { 
        state: updatedTransaction,
        replace: true 
      });
    })
    .catch((error) => {
      toast.error('Error updating transaction!');
    });
    
    setIsModalOpen(false);
  };

  const getButtonLabel = () => {
    return transaction.ClaimedAmount === 0 ? "Approve Transaction" : "Update Transaction";
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewTransaction = (txn) => {
    setLoading(true);
    navigate('/admin/txn', { state: txn });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Transactions</span>
        </button>
        
        <button 
          onClick={handleApproveClick}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
        >
          <Check size={20} className="mr-2" />
          {getButtonLabel()}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold">Transaction Details</h1>
          <div className="flex items-center mt-2 text-blue-100">
            <Clock size={16} className="mr-2" />
            <span>Created: {formatDate(transaction.createdAt)}</span>
          </div>
          <div className="flex items-center mt-1 text-blue-100">
            <IdCard size={16} className="mr-2" />
            <span>Transaction ID: {transaction._id}</span>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Claim Summary</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Claimed Amount</div>
              <div className="text-2xl font-bold flex items-center">
                ₹{transaction.ClaimedAmount}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Approved Amount</div>
              <div className="text-2xl font-bold flex items-center">
                ₹{transaction.passedAmount}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Approval Percentage</div>
              <div className="text-2xl font-bold text-indigo-600">{approvalPercentage.toFixed(1)}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${approvalPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <User size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-500">Full Name</span>
                </div>
                <div className="text-lg font-medium">{transaction.user.name}</div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-500">Email Address</span>
                </div>
                <div className="text-lg">{transaction.user.email}</div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <IdCard size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-500">Employee Code</span>
                </div>
                <div className="text-lg">{transaction.user.employeeCode}</div>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <IdCard size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-500">Medical Card Number</span>
                </div>
                <div className="text-lg">{transaction.user.medicalCardNumber}</div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-500">Address</span>
                </div>
                <div className="text-lg">{transaction.user.address}</div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <Award size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-500">Role</span>
                </div>
                <div className="text-lg capitalize">{transaction.user.role}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FileText size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-500">Remarks</span>
            </div>
            <div className="text-lg">
              {transaction.remark || "No remarks provided"}
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <div className="flex items-center mb-1">
              <Calendar size={14} className="mr-2" />
              <span>Last Updated: {formatDate(transaction.updatedAt)}</span>
            </div>
            <div className="flex items-center">
              <IdCard size={14} className="mr-2" />
              <span>User ID: {transaction.user._id}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <List size={20} className="mr-2 text-gray-500" />
            All Transactions of this User
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Transaction ID</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Claimed Amount</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Approved Amount</th>
                </tr>
              </thead>
              <tbody>
                {transaction && (
                  <tr className="border-b bg-gray-100">
                    <td className="px-4 py-3 text-sm">{transaction._id}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(transaction.createdAt).split(',')[0]}</td>
                    <td className="px-4 py-3 text-sm">₹{transaction.ClaimedAmount}</td>
                    <td className="px-4 py-3 text-sm">₹{transaction.passedAmount}</td>
                  </tr>
                )}
                
                {userTransactions.filter(t => t._id !== transaction._id).map((txn) => (
                  <tr key={txn._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{txn._id}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(txn.createdAt).split(',')[0]}</td>
                    <td className="px-4 py-3 text-sm">₹{txn.ClaimedAmount}</td>
                    <td className="px-4 py-3 text-sm">₹{txn.passedAmount}</td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        onClick={() => handleViewTransaction(txn)} 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                
                {userTransactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                      No previous transactions found for this user
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{getButtonLabel()}</h2>
            
            <div className="mb-6">
              <div className="text-gray-600 mb-2">Claimed Amount:</div>
              <div className="text-2xl font-bold">₹{transaction.ClaimedAmount}</div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="passedAmount" className="block text-gray-600 mb-2">Approved Amount:</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  id="passedAmount"
                  min={0}
                  max={transaction.ClaimedAmount}
                  value={passedAmount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount to approve"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TxnDetails;