import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authEndPoints";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [register, {isLoading: isCreating, isSuccess, isError, error: registerError}] = useRegisterMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    }

    try {
      await register(payload);
      if(isSuccess){
        toast.success("otp send to your gmail!")
      }
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row bg-white rounded-xl lg:rounded-2xl lg:shadow-md border border-gray-300 overflow-hidden">
        {/* Left Side - Brand & Benefits - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-amber-500 to-yellow-600 p-8 text-white">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-amber-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L9 12 2 19l10-3 10 3-7-7-3-10z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold ml-3">ENAURE</h1>
            </div>
            <p className="text-yellow-100 text-sm">
              Exquisite Jewelry Collection
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center mb-6 leading-tight">
              Create your account to access exclusive jewelry services
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-amber-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    Browse Exclusive Collections
                  </h3>
                  <p className="text-yellow-100 text-xs">
                    Discover our handcrafted jewelry pieces
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-amber-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Track Your Orders</h3>
                  <p className="text-yellow-100 text-xs">
                    Real-time order status and delivery updates
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-amber-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    Manage Your Wishlist
                  </h3>
                  <p className="text-yellow-100 text-xs">
                    Save and organize your favorite pieces
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-1 mb-3">
                <div className="w-12 h-1 bg-yellow-300 rounded-full"></div>
                <div className="w-3 h-1 bg-yellow-300 rounded-full"></div>
                <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
              </div>
              <p className="text-yellow-100 text-xs italic">
                "Where Elegance Meets Craftsmanship"
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Header - Only visible on small screens */}
        <div className="lg:hidden bg-gradient-to-br from-amber-500 to-yellow-600 p-6 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-amber-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L9 12 2 19l10-3 10 3-7-7-3-10z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold ml-3">ENAURE</h1>
          </div>
          <p className="text-yellow-100 text-sm mb-2">Create Your Account</p>
          <div className="flex justify-center space-x-1">
            <div className="w-8 h-1 bg-yellow-300 rounded-full"></div>
            <div className="w-2 h-1 bg-yellow-300 rounded-full"></div>
            <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Registration Form - Full width on mobile, 3/5 on desktop */}
        <div className="w-full lg:w-3/5 p-6 sm:p-8">
          <div className="max-w-md mx-auto">
            {/* Hidden on desktop, visible on mobile */}
            <div className="lg:hidden text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Fill in your details to get started
              </p>
            </div>

            {/* Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. username"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4"
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
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-700 hover:text-amber-800 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
