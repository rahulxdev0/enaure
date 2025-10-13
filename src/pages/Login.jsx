import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [activeTab, setActiveTab] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Login data:", formData);
      alert(
        `Login ${
          activeTab === "password" ? "with password" : "with OTP"
        } submitted!`
      );
    }, 1500);
  };

  const handleSendOTP = () => {
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      console.log("OTP sent to:", formData.email);
      alert(`OTP sent to ${formData.email}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-[95vw] sm:max-w-[480px] bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden mx-auto">
        {/* Header Section */}
        <div className="p-6 sm:p-8 text-center bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="flex items-center justify-center mb-3 gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L9 12 2 19l10-3 10 3-7-7-3-10z" />
              </svg>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-black text-lg sm:text-xl font-semibold">
                Welcome to
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-600">
                ENAURE
              </span>
            </div>
          </div>

          <p className="text-amber-600 text-sm sm:text-base mt-2 font-medium">
            Sign in to continue your jewelry journey
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Google Sign In Button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="w-full max-w-[280px] px-4 py-3 flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm text-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm sm:text-base">
                  Sign in with Google
                </span>
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 text-xs sm:text-sm">
                  OR
                </span>
              </div>
            </div>

            {/* Password/OTP Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  activeTab === "password"
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("password")}
              >
                Password
              </button>
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  activeTab === "otp"
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("otp")}
              >
                OTP
              </button>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Password Field - Only show when Password tab is active */}
            {activeTab === "password" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
                />
              </div>
            )}

            {/* Send OTP Button - Only show when OTP tab is active */}
            {activeTab === "otp" && (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading || !formData.email}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-3 px-4 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending OTP...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>
            )}

            {/* Remember Me & Forgot Password - Only show for Password tab */}
            {activeTab === "password" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-amber-600 hover:text-amber-800 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Sign In Button - Only show when Password tab is active */}
            {activeTab === "password" && (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-3 px-4 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            )}
          </form>

          {/* Additional Links */}
          <div className="mt-6 space-y-4 text-center">
            <p className="text-sm">
              <button
                onClick={() =>
                  setActiveTab(activeTab === "password" ? "otp" : "password")
                }
                className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-200"
              >
                Use {activeTab === "password" ? "OTP" : "Password"} instead
              </button>
            </p>

            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-amber-700 hover:text-amber-800 font-semibold transition-colors duration-200"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
