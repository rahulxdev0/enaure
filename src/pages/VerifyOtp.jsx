import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VerifyOtp = () => {
  // Static data - in real implementation, these would come from props or context
  const [email] = useState('user@example.com');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Static user ID - in real implementation, this would come from auth context
  const currentUserId = 'user123';

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Static simulation - in real implementation, this would make an API call
    setTimeout(() => {
      setLoading(false);
      console.log('OTP submitted:', otp);
      // Here you would typically verify the OTP with your backend
    }, 1000);
  };

  const handleResend = () => {
    setLoading(true);
    setError('');
    
    // Static simulation - in real implementation, this would call a resend API
    setTimeout(() => {
      setLoading(false);
      console.log('OTP resent to:', email);
      // Here you would typically call your resend OTP API
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl -mt-20 w-full lg:w-[780px] flex flex-col lg:flex-row gap-5 lg:gap-0 items-center bg-gradient-to-br from-yellow-500 to-amber-700 lg:pl-10 rounded-lg lg:rounded-l-lg lg:rounded-r-lg">
        {/* Left Side - Header Text */}
        <div className="lg:w-2/5 text-center lg:text-left px-6 py-8 lg:py-0 lg:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Verify Your Account</h1>
          <p className="text-white text-base sm:text-lg">
            Enter the verification code sent to your email to secure your account
          </p>
        </div>

        {/* Right Side - Form Container */}
        <div className="lg:w-3/5 w-full">
          <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 shadow-sm rounded-b-lg lg:rounded-r-lg lg:rounded-l-none border border-gray-200 w-full max-w-md mx-auto">
            {/* Section Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Verify OTP?</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                No problem. Just enter the code we sent to {email || 'your email'}.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* OTP Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                  Verification Code
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit code"
                  required
                  maxLength="6"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm sm:text-base text-center tracking-widest font-semibold"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 6-digit code sent to your registered email
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <Link
                  to="/auth/register"
                  className="text-amber-600 mt-3 lg:mb-3 hover:text-amber-800 font-medium transition-colors duration-200 text-sm sm:text-base order-2 sm:order-1"
                >
                  Back to register
                </Link>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-200 text-sm sm:text-base py-2 px-4 border border-amber-600 rounded-lg sm:border-none sm:py-0 sm:px-0 disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6 || !currentUserId}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-medium py-2 sm:py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;