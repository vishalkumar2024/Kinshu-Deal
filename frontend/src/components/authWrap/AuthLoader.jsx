import React, { useEffect, useState } from 'react';

// Professional Loading Component for AuthWrapper using only Tailwind CSS
export default function AuthLoader() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    // Progress bar animation
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  useEffect(() => {
    // Loading dots animation
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    
    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-gray-900">
      {/* Company Logo */}
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white animate-spin-slow"
            >
              <path d="M18 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
              <path d="m2 14 7-4"></path>
              <path d="M9 17v-5a2 2 0 0 1 2-2h8"></path>
              <path d="m15 8 3 3-3 3"></path>
            </svg>
          </div>
          <div className="ml-3 text-xl font-bold text-white">SecurePortal</div>
        </div>
      </div>
      
      {/* Main Loader */}
      <div className="relative w-64 opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden relative mb-6">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading Text */}
        <div className="flex justify-between items-center">
          <div className="text-gray-500 font-medium tracking-wider text-sm">
            LOADING{dots}
          </div>
          <div className="text-blue-400 font-medium text-sm">{progress}%</div>
        </div>
      </div>
        
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(10)].map((_, index) => {
          const size = Math.floor(Math.random() * 100) + 50;
          const positionX = Math.floor(Math.random() * 100);
          const positionY = Math.floor(Math.random() * 100);
          const duration = Math.floor(Math.random() * 8) + 4;
          const delay = Math.floor(Math.random() * 5);
          
          return (
            <div 
              key={index}
              className="absolute bg-blue-500 opacity-10 rounded-full animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${positionX}%`,
                top: `${positionY}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Status Message */}
      <div 
        className="text-xs text-gray-500 mt-8 font-medium opacity-0 animate-fade-in"
        style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
      >
        Authenticating user credentials...
      </div>
    </div>
  );
}