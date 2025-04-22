import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/logo/Logo';
// import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSignupError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
    } catch (error) {
      setSignupError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // const togglePasswordVisibility = () => setShowPassword(!showPassword);
  // const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-cyan-200 to-blue-300 flex flex-col justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="flex justify-center">
          <Logo className="w-40 h-16" />
        </div>
        <h2 className=" text-center text-3xl font-bold text-blue-800">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-blue-500">
        MediTransact Medical Card Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 border-2 border-blue-300 px-6 shadow-lg rounded-2xl">
          {signupError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {signupError}
            </div>
          )}

          <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="mt-1 outline-none w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: { value: 2, message: 'Min 2 characters' }
                  })}
                />
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="mt-1 w-full outline-none px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: { value: 2, message: 'Min 2 characters' }
                  })}
                />
                {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="employeeCode" className="block text-sm font-medium text-blue-700">
                Employee Code
              </label>
              <input
                id="employeeCode"
                type="text"
                className="mt-1 w-full px-4 py-2 outline-none border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('employeeCode', {
                  required: 'Employee code is required',
                  pattern: {
                    value: /^[A-Z0-9]{5,10}$/,
                    message: 'Must be 5-10 uppercase letters/numbers'
                  }
                })}
              />
              {errors.employeeCode && <p className="text-sm text-red-500 mt-1">{errors.employeeCode.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full px-4 py-2 outline-none border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="mt-1 w-full px-4 py-2 border outline-none border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Min 8 characters' },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Must include uppercase, lowercase, number, symbol'
                    }
                  })}
                />
                {/* <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-blue-500" /> : <Eye className="h-5 w-5 text-blue-500" />}
                </button> */}
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="mt-1 w-full px-4 py-2 outline-none border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
                  {...register('confirmPassword', {
                    required: 'Confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                {/* <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-blue-500" /> : <Eye className="h-5 w-5 text-blue-500" />}
                </button> */}
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 px-4 rounded-lg shadow-lg text-sm font-semibold disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-blue-500">
            Already have an account?
            <Link to="/login" className="ml-2 text-blue-700 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
