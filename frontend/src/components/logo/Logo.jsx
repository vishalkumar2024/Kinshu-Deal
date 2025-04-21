import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className }) => {
  return (
    <Link to='/'>
      <div className={`flex items-center space-x-2 text-teal-600 ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v3m0 12v-3m7.5-7.5h-3m-12 0h3m7.5-3.75a3.75 3.75 0 01-7.5 0m7.5 7.5a3.75 3.75 0 01-7.5 0"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 12h7.5m-6 3.75h3"
          />
        </svg>
        <span className="text-lg font-semibold tracking-tight">MediTransact</span>
        <span className="sr-only">Medical Transaction Management</span>
      </div>
    </Link>
  );
};

export default Logo;