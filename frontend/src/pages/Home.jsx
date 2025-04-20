import React from 'react';
import { User, Settings, LogIn } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome to Our Platform</h1>
              <p className="text-lg mb-6 text-blue-100">The complete solution for your business needs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="/user" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center">
                  <User className="mr-2 h-4 w-4" />
                  User Dashboard
                </a>
                <a href="/admin" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-700 text-white py-8">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="mb-5">Join thousands of satisfied customers today.</p>
          <div className="flex justify-center gap-4">
            <a href="/login" className="bg-white text-blue-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
              Login
            </a>
            <a href="/signup" className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition">
              Sign Up
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;