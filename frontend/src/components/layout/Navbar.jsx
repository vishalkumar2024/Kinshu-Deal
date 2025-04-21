import React from 'react';
import { LogOut } from 'lucide-react';
import Logo from '../logo/Logo';

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900/90 text-white shadow-2xl py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-4">
          <Logo className="w-40 h-12 text-white drop-shadow-md" />
        </div>

        {/* Right: Admin name & Logout */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm font-medium text-blue-100">
            Welcome, <span className="font-semibold text-white">Admin</span>
          </span>
          <button className="flex items-center gap-2 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
