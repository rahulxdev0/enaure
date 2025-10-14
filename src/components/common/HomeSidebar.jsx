import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  ChevronRight,
  LogIn,
  Home,
  ShoppingBag,
  Heart,
  UserCircle,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../store/slices/authSlice";
import { departments } from "./data/department";

const HomeSidebar = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const isActive = (path) => location.pathname === path;

  // Handle animation state
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLoginClick = () => {
    navigate("/login");
    onClose();
  };

  if (!isOpen && !isAnimating) return null;

  const sidebarContent = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white z-[101] shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen ? "box" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center flex-1">
              <Link
                to="/"
                onClick={onClose}
                className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
              >
                Enaure
              </Link>
            </div>
          </div>

          {/* User Profile Section */}
          <div
            className="px-4 py-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black
 text-white mx-4 mt-4 rounded-2xl"
          >
            {isAuthenticated && user ? (
              /* Logged In State */
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm opacity-90 truncate">Welcome back</p>
                  <p className="font-semibold truncate">
                    {user.name || user.email}
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className="px-3 py-1.5 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs whitespace-nowrap"
                >
                  Dashboard
                </button>
              </div>
            ) : (
              /* Logged Out State */
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Hello Guest</p>
                  <p className="text-sm opacity-90 truncate">
                    Sign in for better experience
                  </p>
                </div>
                <button
                  onClick={handleLoginClick}
                  className="px-3 py-1.5 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs whitespace-nowrap flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Quick Links */}
            <div className="space-y-1 mb-8">
              <button
                onClick={() => handleNavigate("/")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive("/")
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>

              <button
                onClick={() => handleNavigate("/orders")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive("/orders")
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
              </button>

              <button
                onClick={() => handleNavigate("/wishlist")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive("/wishlist")
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
              </button>
            </div>

            {/* Departments Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Shop by Category
              </h3>
              <div className="space-y-1">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  const active = isActive(dept.path);
                  return (
                    <button
                      key={dept.path}
                      onClick={() => handleNavigate(dept.path)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                        active
                          ? "bg-orange-50 text-orange-600 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-orange-600"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                        />
                        <span className="font-medium">{dept.name}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          active
                            ? "text-orange-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support Section */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Support
              </h3>
              <button
                onClick={() => handleNavigate("/help")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive("/help")
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Help Center</span>
              </button>
              <button
                onClick={() => handleNavigate("/settings")}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive("/settings")
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                © 2024 Enaure. All rights reserved.
              </p>
              <div className="flex justify-center gap-4">
                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Privacy
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Terms
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }

        /* ...and then apply it: */
        .box {
          animation: slide-in 1000ms;
        }
      `}</style>
    </>
  );

  return createPortal(sidebarContent, document.body);
};

export default HomeSidebar;
