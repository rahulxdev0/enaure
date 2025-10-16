// src/components/jewellery/cart/Cart.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMobileCheck from '../../../hooks/useMobileCheck';
import CartItem from './components/CartItem';
import CartTotals from './components/CartTotals';

// Mock cart data - replace this with your actual data source
const mockCartItems = [
  {
    id: 1,
    name: '9CT White Gold Diamond Ring',
    price: 199.99,
    quantity: 2,
    image: '/images/ring1.jpg'
  },
  {
    id: 2,
    name: 'Silver Pendant Necklace',
    price: 89.99,
    quantity: 1,
    image: '/images/necklace1.jpg'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const isMobile = useMobileCheck();

  // Initialize with mock data - replace this with your actual data fetching
  useEffect(() => {
    setCartItems(mockCartItems);
  }, []);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleContinueShopping = () => {
    window.history.back();
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-2">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          {!isMobile && (
            <div className="mb-8 mt-[-5px]">
              <nav className="text-sm text-gray-600">
                <ol className="list-none p-0 inline-flex">
                  <li className="flex items-center">
                    <a href="/" className="hover:text-yellow-600 transition-colors">Home</a>
                    <span className="mx-2">/</span>
                  </li>
                  <li className="flex items-center">
                    <a href="/shop" className="hover:text-yellow-600 transition-colors">Shop</a>
                    <span className="mx-2">/</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-900 font-medium">Cart</span>
                  </li>
                </ol>
              </nav>
            </div>
          )}

          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-6 uppercase`}>CART</h1>

          <div className="text-center py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">Add some products to your cart to see them here.</p>
              <button 
                onClick={handleContinueShopping}
                className="px-6 py-3 bg-yellow-600 text-white hover:bg-black active:bg-black transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        {!isMobile && (
          <div className="mb-8 mt-[-5px]">
            <nav className="text-sm text-gray-600">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <a href="/" className="hover:text-yellow-600 transition-colors">Home</a>
                  <span className="mx-2">/</span>
                </li>
                <li className="flex items-center">
                  <a href="/shop" className="hover:text-yellow-600 transition-colors">Shop</a>
                  <span className="mx-2">/</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-900 font-medium">Cart</span>
                </li>
              </ol>
            </nav>
          </div>
        )}

        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-6 uppercase`}>CART</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Cart Items */}
          <div className="lg:w-8/12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header - Hidden on mobile */}
              {!isMobile && (
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700 uppercase">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>
              )}

              {/* Cart Items using CartItem component */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={{
                      ...item,
                      subtotal: item.price * item.quantity // Calculate subtotal for each item
                    }}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              {!isMobile && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Apply Coupon
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="coupon"
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                      <button className="px-6 py-3 bg-yellow-600 text-white hover:bg-black active:bg-black transition-colors font-medium whitespace-nowrap">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
                
              <div className="flex flex-row space-x-3 w-full sm:w-auto">
                <button 
                  onClick={handleClearCart}
                  className="flex-1 sm:flex-none px-6 sm:px-8 py-3 bg-gray-800 text-white hover:bg-black active:bg-black transition-colors font-medium text-sm sm:text-base"
                >
                  {isMobile ? 'Clear Cart' : 'Clear Cart'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Cart Totals using CartTotals component */}
          <div className="lg:w-4/12">
            <CartTotals
              subtotal={subtotal}
              total={total}
              onCheckout={handleCheckout}
              onContinueShopping={handleContinueShopping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;