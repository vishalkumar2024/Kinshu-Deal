import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, FileText, DollarSign, User, Mail, IdCard, MapPin, Award } from 'lucide-react';

const TxnDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (location.state) {
      setTransaction(location.state);
    }
    console.log(location.state);
  }, [location]);

  if (!transaction) {
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

  // Format date
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

  // Calculate approval percentage
  const approvalPercentage = (transaction.passedAmount / transaction.ClaimedAmount) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Transactions</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
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

        {/* Transaction Summary */}
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

        {/* Employee Information */}
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

        {/* Remarks */}
        <div className="p-6">
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
      </div>
    </div>
  );
};

export default TxnDetails;