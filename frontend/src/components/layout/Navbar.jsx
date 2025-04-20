import React from 'react';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">XYZ Medical Cards Admin</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium">Admin User</span>
          <button className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition duration-300">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;