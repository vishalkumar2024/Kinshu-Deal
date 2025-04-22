import React from 'react';
import { User, Settings, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector((state) => state.user);
  
  const renderButton = () => {
    if (!user) {
      return (
        <Link 
          to="/login"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center text-lg"
        >
          <LogIn className="mr-2 w-5 h-5" />
          Login
        </Link>
      );
    }
    
    if (user.role === "admin") {
      return (
        <Link 
          to="/admin"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center text-lg"
        >
          <Settings className="mr-2 w-5 h-5" />
          Admin Dashboard
        </Link>
      );
    }
    
    return (
      <Link 
        to="/user"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center text-lg"
      >
        <User className="mr-2 w-5 h-5" />
        User Dashboard
      </Link>
    );
  };

  return (
    <div className="w-full font-sans min-h-screen">
      <section className="bg-gradient-to-br from-blue-200 via-white to-indigo-300 text-blue-900 py-24 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-blue-300/30 rounded-full blur-2xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-[30%] right-[20%] w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between z-10 relative">
          <div className="md:w-1/2 text-center md:text-left mt-10 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-sm">
              Welcome to MediTransact Portal
            </h1>
            
            <p className="text-lg md:text-xl text-blue-800 mb-8 leading-relaxed max-w-lg">
              A smart platform to manage medical card transactions for ex-employees and administrators.
            </p>
            
            <div className="flex justify-center md:justify-start">
              {renderButton()}
            </div>
          </div>
          
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl transform rotate-3"></div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-100 relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="text-white h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center text-blue-800 mb-4">MediTransact Portal</h3>
                <p className="text-blue-700 text-center">Secure, efficient management of your medical benefits</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;