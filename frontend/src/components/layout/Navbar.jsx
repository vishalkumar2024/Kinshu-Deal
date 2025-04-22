import React from 'react';
import { LogOut, LogIn } from 'lucide-react';
import Logo from '../logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../store/userSlice';
import { toast } from 'react-toastify';
import config from '../../config/config';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout=async () => {
    try {
      await axios.get(`${config.API_URL}/api/auth/logout`, { withCredentials: true });
      dispatch(logout());
      localStorage.removeItem('session');
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  }
  
  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900/90 text-white shadow-2xl py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Logo className="w-40 h-12 text-white drop-shadow-md" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:inline text-sm font-medium text-blue-100">
                Welcome, <span className="font-semibold text-white">{user.name}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center text-sm cursor-pointer font-medium text-blue-100 hover:text-white transition duration-200 bg-blue-600/30 px-3 py-2 rounded-lg hover:bg-blue-600/50"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center text-sm font-medium text-blue-100 hover:text-white transition duration-200 bg-blue-600/30 px-3 py-2 rounded-lg hover:bg-blue-600/50"
            >
              <LogIn className="w-5 h-5 mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;