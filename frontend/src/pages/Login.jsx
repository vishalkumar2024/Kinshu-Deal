import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/logo/Logo';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import config from '../config/config';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (inputData) => {
    setIsLoading(true);
    setLoginError('');
    try {
      const { data } = await axios.post(`${config.API_URL}/api/auth/login`, inputData, { withCredentials: true });
      dispatch(login(data.user))
      localStorage.setItem('session', JSON.stringify(data.token));
      toast.success('Login successful!');
      navigate('/admin');
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-red-200 to-blue-300 font-['Inter'] px-4 py-12">
      <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10">
      
        <div className=" text-center mb-6">
          <Logo className="w-40  h-16 mx-auto mb-2" />
          <h1 className="text-3xl mb-2.5 font-bold text-blue-800">Sign in to your account</h1>
          <p className="text-sm text-blue-600">MediTransact Medical Card Management System</p>
        </div>

        {loginError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm border border-red-300 mb-4">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-white/70 border border-blue-300 text-blue-800 shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters required',
                  },
                })}
                className="mt-1 w-full px-4 py-2 rounded-xl bg-white/70 border border-blue-300 text-blue-800 shadow-inner pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between text-sm text-blue-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-blue-300" />
              <span>Remember me</span>
            </label>
            <a href="" className="hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 font-semibold shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-blue-700">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-900 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;