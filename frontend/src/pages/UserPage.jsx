import React, { useState, useEffect } from 'react';
import { User, CreditCard, HomeIcon, Calendar } from 'lucide-react';
import axios from 'axios';
import config from '../config/config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const { user } = useSelector(state => state.user);

  // State for user data and transactions
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data and transactions from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(`${config.API_URL}/api/user/${user._id}`, {
          withCredentials: true
        });
        setUserData(userResponse.data.data);

        // Fetch transactions for the user
        const transactionResponse = await axios.get(`${config.API_URL}/api/transaction/user/${user._id}`, {
          withCredentials: true
        });
        setTransactions(transactionResponse.data.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Format date from ISO string to Month, Year format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading your information...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700">No user data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-100 via-indigo-100 to-blue-300 font-['Inter']">
      {/* Header */}
      <header className="bg-blue-400 shadow">
        <div className="max-w-7xl mx-auto text-blue-600 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-blue-800" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">MediTransact Medical Card Portal</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Details Card */}
        <div className="bg-white shadow-xl shadow-gray-400 rounded-lg mb-10">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Employee Details</h2>
          </div>
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start hover:bg-gray-200 p-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-blue-500 font-semibold">Full Name</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{userData.name}</p>
                </div>
              </div>

              <div className="flex hover:bg-gray-200 p-3 items-start">
                <CreditCard className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-blue-500 font-semibold">Medical Card Number</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{userData.medicalCardNumber}</p>
                </div>
              </div>

              <div className="flex items-start hover:bg-gray-200 p-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-blue-500 font-semibold">Employee Code</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{userData.employeeCode}</p>
                </div>
              </div>

              <div className="flex items-start hover:bg-gray-200 p-3">
                <HomeIcon className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-blue-500 font-semibold">Address</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{userData.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-8 py-7 hover:bg-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <p className="text-sm text-blue-500 font-semibold">Current Balance</p>
                  <p className="text-xl font-semibold text-green-600">₹{userData.balance.toFixed(2)}</p>
                </div>
              </div>
              <Link
                to="/transaction/new"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                New Transaction
              </Link>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white shadow-xl shadow-gray-400 rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs text-blue-500 font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs text-blue-500 font-semibold uppercase tracking-wider">
                    Claimed Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs text-blue-500 font-semibold uppercase tracking-wider">
                    Passed Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs text-blue-500 font-semibold uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{transaction.ClaimedAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={transaction.passedAmount < transaction.ClaimedAmount ? "text-yellow-600" : "text-green-600"}>
                          ₹{transaction.passedAmount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.remark}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination - Simple version */}
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{transactions.length}</span> of{" "}
                  <span className="font-medium">{transactions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPage;