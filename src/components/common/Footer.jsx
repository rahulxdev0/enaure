import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Send, Youtube, Twitter } from 'lucide-react';

// Payment Icons Component
const PaymentIcons = () => (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        <div className="flex items-center justify-center h-6 px-2 text-xs font-bold text-gray-500 border border-gray-200 bg-white min-w-[50px]">VISA</div>
        <div className="flex items-center justify-center h-6 px-2 text-xs font-bold text-gray-500 border border-gray-200 bg-white min-w-[50px]">M/C</div>
        <div className="flex items-center justify-center h-6 px-2 text-xs font-bold text-gray-500 border border-gray-200 bg-white min-w-[60px]">PAYPAL</div>
        <div className="flex items-center justify-center h-6 px-2 text-xs font-bold text-gray-500 border border-gray-200 bg-white min-w-[60px]">AMEX</div>
        <div className="flex items-center justify-center h-6 px-2 text-xs font-bold text-gray-500 border border-gray-200 bg-white min-w-[70px]">DISCOVER</div>
    </div>
);

// Social Media Icons
const socialIcons = [
    { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, href: '#'},
    { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: '#'},
    { name: 'Telegram', icon: <Send className="w-4 h-4" />, href: '#'},
    { name: 'Twitter', icon: <Twitter className="w-4 h-4" />, href: '#'},
    { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, href: '#'},
];

const Footer = () => {
    const headerStyle = "text-base font-semibold uppercase tracking-widest text-gray-800 mb-4 lg:mb-6";
    const linkStyle = "text-gray-600 text-sm tracking-wide hover:text-gray-900 transition-colors duration-200";
    const joiceGold = "#C9A236";

    return (
        <footer className="bg-white text-gray-800 pt-10 lg:pt-14 pb-3 border-t border-gray-300">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-x-8 lg:gap-y-10 mb-12 lg:mb-16">
                    
                    {/* Company Info - Full width on mobile, then appropriate spans */}
                    <div className="sm:col-span-2 lg:col-span-1 lg:pr-4">
                        <div className="flex flex-col items-center sm:items-start mb-6">
                            <Link to="/" className="flex items-center space-x-3 mb-3">
                                <div className="flex flex-col">
                                    <span className="text-lg lg:text-2xl font-bold tracking-widest text-gray-700">ENAURE</span>
                                </div>
                            </Link>
                        </div>
                        
                        <p className="text-sm text-gray-500 text-center sm:text-left leading-relaxed max-w-md sm:max-w-xs mx-auto sm:mx-0">
                            Unleash the radiance of your inner beauty with our premium jewelry brand - a perfect blend of sophistication and style.
                        </p>

                        {/* Social Icons - Mobile: centered, Desktop: left aligned */}
                        <div className="flex justify-center sm:justify-start space-x-2 mt-6">
                            {socialIcons.map((item) => (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-8 h-8 lg:w-9 lg:h-9 border border-gray-300 rounded-sm flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-900 transition-all duration-200"
                                >
                                    {item.icon} 
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* ACCOUNT Links */}
                    <div className="text-center sm:text-left">
                        <h4 className={headerStyle}>ACCOUNT</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/dashboard" className={linkStyle}>Dashboard</Link></li>
                            <li><Link to="/orders" className={linkStyle}>Orders</Link></li>
                            <li><Link to="/wishlist" className={linkStyle}>Wishlist</Link></li>
                            <li><Link to="/addresses" className={linkStyle}>Addresses</Link></li>
                        </ul>
                    </div>
                    
                    {/* CATALOG Links */}
                    <div className="text-center sm:text-left">
                        <h4 className={headerStyle}>CATALOG</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/shop/category" className={linkStyle}>Shop by category</Link></li>
                            <li><Link to="/shop/brand" className={linkStyle}>Shop by brand</Link></li>
                            <li><Link to="/promotions" className={linkStyle}>Promotions</Link></li>
                            <li><Link to="/sitemap" className={linkStyle}>Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* HELP Links */}
                    <div className="text-center sm:text-left">
                        <h4 className={headerStyle}>HELP</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/features" className={linkStyle}>Features</Link></li>
                            <li><Link to="/faq" className={linkStyle}>FAQ</Link></li>
                            <li><Link to="/about" className={linkStyle}>About us</Link></li>
                            <li><Link to="/contact" className={linkStyle}>Contact us</Link></li>
                        </ul>
                    </div>
                    
                    {/* CONTACT US */}
                    <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                        <h4 className={headerStyle}>CONTACT US</h4>
                        <div className="max-w-xs mx-auto sm:mx-0">
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li className="flex items-start justify-center sm:justify-start">
                                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: joiceGold }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                                    </svg>
                                    <div className="text-left">
                                        7031 N 35th Ave, Phoenix <br />
                                        <span className="block">Arkansas United States</span>
                                    </div>
                                </li>
                                <li className="flex items-start justify-center sm:justify-start">
                                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: joiceGold }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.45-5.18-3.8-6.57-6.57l2.2-2.2c.27-.27.35-.66.24-1.01C8.75 6.95 8.55 5.75 8.55 4.5c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                                    </svg>
                                    <div className="text-left">
                                        <span className="block text-gray-500">Call us 8 AM – 10 PM</span>
                                        <span className="block text-base font-semibold text-gray-900 mt-1">6668 5555 8464</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 mb-6 lg:mb-4"></div>

                {/* Bottom Section: Payment, Currency */}
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                    
                    {/* Payment Icons */}
                    <div className="order-2 lg:order-1 w-full lg:w-auto">
                        <PaymentIcons />
                    </div>

                    {/* Currency Selector */}
                    <div className="order-1 lg:order-2 relative inline-block text-gray-500 text-sm">
                        <select className="appearance-none bg-white py-2 pl-3 pr-8 border border-gray-200 focus:outline-none cursor-pointer text-gray-800 rounded-sm w-full lg:w-auto">
                            <option value="USD" className='font-semibold lg:mb-2'>$ USD</option>
                            <option value="EUR">€ EUR</option>
                            <option value="GBP">£ GBP</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707 4-4a1 1 0 00-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4z"/>
                            </svg>
                        </div>
                    </div>
                </div>

             {/* Copyright and Legal Links */}
<div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 mt-6 lg:mt-8 pt-4 border-t border-gray-300">
    
    {/* Legal Links - Top on mobile, right on desktop */}
    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-3 md:mb-0 order-1 md:order-2">
        <Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs">Terms of use</Link>
        <Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs">Privacy Policy</Link>
        <Link to="/interest-based-ads" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs">Interest Based Ads</Link>
        <Link to="/accessibility" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-xs">Accessibility</Link>
    </div>
    
    {/* Copyright - Bottom on mobile, left on desktop */}
    <p className="text-center md:text-left order-2 md:order-1">
        Copyright © 2025 Joice. All Rights Reserved
    </p>
</div>
            </div>
        </footer>
    );
};

export default Footer;