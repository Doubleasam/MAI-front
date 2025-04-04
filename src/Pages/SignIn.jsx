import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Family from "../assets/Family.jpeg";
import useAuthStore from '../Store/Auth';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const { 
        login, 
        loading, 
        error: authError, 
        clearError,
        tempUser,
        user
    } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
        
        if (user) {
            navigate('/dashboard');
        }
        
        if (tempUser) {
            navigate('/verify-pin');
        }
    }, [user, tempUser, navigate, clearError]);

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await login({
                email,
                password,
                rememberMe
            });
            
            if (response?.requiresPinVerification) {
                navigate('/verify-pin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Sign In Form */}
            <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md space-y-8">
                    {/* Header Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-lg text-gray-600">
                            Hey User, Welcome Back We've Missed You!
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    {/* Form Section */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'Sign in'}
                            </button>
                        </form>

                        {/* Create Account Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden md:flex md:w-1/2 relative bg-gray-100">
                <img
                    src={Family}
                    alt="Family"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Image Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-3">Welcome to MAI</h2>
                        <p className="text-lg leading-relaxed">
                            Join forces with friends and family to save for your dreams! Our fun and intuitive group savings app makes pooling funds easy, exciting, and rewarding.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;