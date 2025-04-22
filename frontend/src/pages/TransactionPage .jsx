import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, IndianRupee, FileText } from 'lucide-react';
import axios from 'axios';
import config from '../config/config';
import { toast } from 'react-toastify';

const TransactionPage = () => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    ClaimedAmount: '',
    remark: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.ClaimedAmount || isNaN(formData.ClaimedAmount) || formData.ClaimedAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }
      
      if (!formData.remark.trim()) {
        throw new Error('Please provide a remark for the transaction');
      }

      const {data} = await axios.post(
        `${config.API_URL}/api/transaction`,
        {
          ...formData,
          user: user._id,
          ClaimedAmount: parseFloat(formData.ClaimedAmount)
        },
        { withCredentials: true }
      );
      toast.success('Transaction submitted successfully!');
      setSuccess('Transaction submitted successfully!');
      setFormData({
        ClaimedAmount: '',
        remark: ''
      });
      
      setTimeout(() => {
        navigate('/user');
      }, 2000);
      
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to submit transaction');
      setError(err.response?.data?.message || err.message || 'Failed to submit transaction');
      console.error('Transaction submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">MediTransact Medical Card Portal</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/user')} 
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-500">
            <h2 className="text-lg font-semibold text-white">New Transaction Request</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label htmlFor="ClaimedAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Amount
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    name="ClaimedAmount"
                    id="ClaimedAmount"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-150 ease-in-out"
                    placeholder="Enter amount"
                    min="0"
                    value={formData.ClaimedAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Details
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="remark"
                    id="remark"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-150 ease-in-out"
                    placeholder="Describe the medical expense"
                    value={formData.remark}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Example: Consultation with Dr. Sharma on 15th June for back pain
                </p>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Submit Claim'}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">About the claims process</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Submitted claims are typically processed within 3-5 business days. The approved amount may vary based on your policy coverage. You'll receive an email notification once your claim has been processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;