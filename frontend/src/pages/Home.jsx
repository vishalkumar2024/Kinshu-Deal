import React from 'react';
import { User, Settings, LogIn } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br pl-3 from-blue-200 via-white to-indigo-300 text-blue-900 py-20 relative overflow-hidden shadow-md">
        <div className="absolute top-[-40px] right-[-80px] w-72 h-72 bg-blue-300/30 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-[-40px] left-[-80px] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between z-10 relative">
          {/* Text Content */}
          <div className="md:w-1/2  text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-cyan-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Welcome to MediTransact Portal
            </h1>
            <p className="text-lg text-blue-800 mb-6 leading-relaxed">
              A smart platform to manage medical card transactions for ex-employees and admins.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/user"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:bg-blue-800 transform transition-transform duration-300 hover:scale-102 flex items-center justify-center transition-all"
              >
                <User className="mr-2" /> User Dashboard
              </a>
              <a
                href="/admin"
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:bg-indigo-800 transform transition-transform duration-300 hover:scale-102  flex items-center justify-center transition-all"
              >
                <Settings className="mr-2" /> Admin Dashboard
              </a>
            </div>
          </div>

          {/* Optional Image / Visual */}
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            {/* <img
              src="https://assets-global.website-files.com/647d5b6e924c69c19eaabfa3/64b7b42a0ae9b0bc57cde153_Healthcare-Tech.svg"
              alt="Medical System"
              className="w-[85%] max-w-md drop-shadow-xl"
            /> */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r my-9 from-blue-200 via-white to-blue-200 text-blue-800 py-10 text-center shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="mb-6 text-lg text-blue-700">Join thousands of secure users managing their health benefits smarter.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <LogIn size={18} /> Login
            </a>
            <a
              href="/signup"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all hover:scale-105"
            >
              Sign Up
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
