

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
// Import the custom hook
import useMobileCheck from '../../../../hooks/useMobileCheck'; 

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMobileCheck(); // <--- Use the hook

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Mock user data
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    joinDate: 'January 2024'
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        setTimeout(() => {
          setUser(mockUser);
          setProfileForm(mockUser);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Replace with actual API call
      // await api.put('/user/profile', profileForm);
      
      setUser(profileForm);
      showMessage('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('Error updating profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('New passwords do not match', 'error');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters long', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      // Replace with actual API call
      // await api.put('/user/password', passwordForm);
      
      showMessage('Password changed successfully!', 'success');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      showMessage('Error changing password. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center -mt-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Message Alert - Completed from original prompt */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            messageType === 'success'
              ? 'bg-green-50 border-green-400 text-green-700'
              : 'bg-red-50 border-red-400 text-red-700'
          } flex items-center justify-between`}>
            <div className="flex items-center">
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">{message}</span>
            </div>
            <button onClick={() => setMessage('')} className="p-1 rounded-full hover:bg-opacity-20 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* User Profile Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-4 pb-2 border-b border-gray-100">
            <User className="w-5 h-5 text-yellow-600 mr-2" />
            Personal Information
          </h3>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 text-gray-600`}>
            <div>
              <p className="font-medium text-gray-700">Member Since</p>
              <p>{user?.joinDate}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Account ID</p>
              <p>#JD{user?.joinDate.slice(-4)}</p>
            </div>
          </div>
        </div>
        
        {/* Profile Update Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
            <User className="w-5 h-5 text-yellow-600 mr-2" />
            Update Profile Details
          </h3>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Email and Phone (now stacked on mobile) */}
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={profileForm.email}
                    disabled // Email is often read-only, requiring a separate verification process
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Contact support to change your email address.</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold 
                hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${isMobile ? 'w-full' : 'w-auto'}
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
            <Lock className="w-5 h-5 text-red-500 mr-2" />
            Change Password
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            {['current', 'new', 'confirm'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {field.replace('confirm', 'confirm new')} Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword[field] ? 'text' : 'password'}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={passwordForm[`${field}Password`]}
                    onChange={(e) => setPasswordForm({...passwordForm, [`${field}Password`]: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword[field] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`
                bg-red-500 text-white py-3 px-6 rounded-lg font-semibold 
                hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${isMobile ? 'w-full' : 'w-auto'}
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Changing Password...
                </div>
              ) : 'Change Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AccountDetails;