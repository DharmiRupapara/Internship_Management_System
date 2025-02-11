import React, { useState } from 'react';
import { Eye, EyeOff, Briefcase, GraduationCap, UserCog, Users } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const getUserMessage = () => {
    switch(selectedTab) {
      case 'student': return "Access internship opportunities and track your internship";
      case 'guide': return "Monitor and guide students through their internship journey";
      case 'admin': return "Manage portal operations and oversee all activities";
      default: return "";
    }
  };

  const getUsername = () => {
    switch(selectedTab) {
      case 'student': return "student";
      case 'guide': return "guide";
      case 'admin': return "admin";
      default: return "username";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: selectedTab,
          username: formData.username,
          password: formData.password
        }),
        credentials: 'include' // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Handle successful login
      window.location.href = `/${selectedTab}-dashboard`; // Redirect to dashboard
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Internship Portal</h1>
          <p className="text-gray-600">
            Welcome to your internship management system
            <span className="text-blue-600 block mt-1">Connect. Learn. Grow.</span>
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-1.5">
          <div className="flex rounded-lg bg-white shadow-sm p-1">
            {['student', 'guide', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedTab(role)}
                className={`flex-1 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedTab === role ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {role === 'student' && <GraduationCap className="h-4 w-4" />}
                {role === 'guide' && <Users className="h-4 w-4" />}
                {role === 'admin' && <UserCog className="h-4 w-4" />}
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder={getUsername()}
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all duration-200 pr-11"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex justify-end pt-1">
              <a href="/reset-password" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                Reset password
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : 'Sign in to Portal'}
          </button>
        </form>

        <div className="text-xs text-center text-gray-500">
          {getUserMessage()}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;