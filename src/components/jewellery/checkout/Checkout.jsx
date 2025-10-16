//src/components/jewellery/checkout/Checkout.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from './components/CheckoutForm'; 
import OrderSummary from './components/OrderSummary'; 
import useMobileCheck from '../../../hooks/useMobileCheck';

const Checkout = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const isMobile = useMobileCheck();

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb - Hidden on mobile */}
          {!isMobile && (
            <div className="mb-6">
              <nav className="text-sm text-gray-600">
                <ol className="list-none p-0 inline-flex">
                  <li className="flex items-center">
                    <Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-900 font-medium">Checkout</span>
                  </li>
                </ol>
              </nav>
            </div>
          )}

          {/* Main Heading */}
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-6`}>CHECKOUT</h1>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Left Column - Checkout Form */}
            <div className="lg:w-1/2">
              {/* Coupon Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <p className="text-gray-700 text-sm">
                  Have a coupon?{' '}
                  <button 
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="text-yellow-600 hover:text-yellow-700 underline transition-colors text-sm"
                  >
                    Click here to enter your code
                  </button>
                </p>

                {showCoupon && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm mb-2">
                      If you have a coupon code, please apply it below.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 px-3 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-sm"
                      />
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors font-medium text-sm whitespace-nowrap">
                        Apply coupon
                      </button>
                    </div>
                  </div>
                )}
              </div>
            
              {/* Billing Details Form */}
              <CheckoutForm />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:w-1/2">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;