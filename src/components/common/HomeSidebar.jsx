import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, ChevronRight, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import { departments } from './data/department';

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
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 400);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    const handleLoginClick = () => {
        navigate('/login');
        onClose();
    };

    if (!isOpen && !isAnimating) return null;

    const sidebarContent = (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-full bg-white z-[101] shadow-xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >

                {/* Sidebar Content */}
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* User Profile Section */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-4">
                        {/* Left: Back Button */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Close sidebar"
                        >
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </button>

                        {/* Center: User Info Section */}
                        <div className="flex-1 flex items-center justify-center -ml-5">
                            {isAuthenticated && user ? (
                                /* Logged In State */
                                <div className="logged-in info-wrap flex items-center gap-4">
                                    <div className="info text-right">
                                        <p className="text-sm opacity-90">Welcome back,</p>
                                        <p className="font-semibold text-lg truncate">{user.email}</p>
                                    </div>
                                    <a
                                        href="/dashboard"
                                        className="et-button small px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
                                    >
                                        Dashboard
                                    </a>
                                </div>
                            ) : (
                                /* Logged Out State */
                                <div className="logged-out info-wrap flex items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar-placeholder w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="info text-left">
                                            <span className="block text-sm font-medium">Hello Guest</span>
                                            <span className="block text-xs opacity-80">For better experience login</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLoginClick}
                                        className="et-button small px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
                                    >
                                        Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Section */}
                    <div className="p-6 space-y-6">
                        {/* Home Section */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Menu
                            </h3>
                            <button
                                onClick={() => handleNavigate('/')}
                                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${isActive('/')
                                    ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="font-medium">Home</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Departments Section */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Departments
                            </h3>
                            <div className="space-y-2">
                                {departments.map((dept) => {
                                    const Icon = dept.icon;
                                    const active = isActive(dept.path);
                                    return (
                                        <button
                                            key={dept.path}
                                            onClick={() => handleNavigate(dept.path)}
                                            className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${active
                                                ? `${dept.bgColor} ${dept.textColor} border-l-4 ${dept.borderColor}`
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Icon className={`w-5 h-5 ${active ? dept.textColor : 'text-gray-600'}`} />
                                                <span className="font-medium">{dept.name}</span>
                                            </div>
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto p-6 border-t">
                        <div className="text-center">
                            <Link
                                to="/"
                                onClick={onClose}
                                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"
                            >
                                Enaure
                            </Link>
                            <p className="text-xs text-gray-500 mt-2">Premium Shopping Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return createPortal(sidebarContent, document.body);
};

export default HomeSidebar;