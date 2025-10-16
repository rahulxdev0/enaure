import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import useMobileCheck from '../../../hooks/useMobileCheck';

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const isMobile = useMobileCheck();

  // Mock cart data - replace with your actual data source
  useEffect(() => {
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
    setCartItems(mockCartItems);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <>
      <div className={`
        fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        ${isMobile ? 'w-full' : 'w-96'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>CART</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className={`overflow-y-auto ${isMobile ? 'h-[calc(100vh-140px)] p-4' : 'h-[calc(100vh-200px)] p-6'}`}>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`object-cover rounded border border-gray-200 flex-shrink-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium text-gray-900 line-clamp-2 mb-2 ${isMobile ? 'text-xs' : ''}`}>
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Minus className="w-2 h-2" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Plus className="w-2 h-2" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
            <div className="flex justify-between items-center mb-3">
              <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700`}>Subtotal:</span>
              <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>${subtotal.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/cart"
                onClick={onClose}
                className="py-2 bg-white border-2 border-black text-black text-center hover:bg-black hover:text-white transition-all duration-300 font-medium text-xs uppercase tracking-wide"
              >
                View Cart
              </Link>
              <Link 
                to="/checkout"
                onClick={onClose}
                className="py-2 bg-yellow-600 text-white text-center hover:bg-black transition-colors duration-300 font-medium text-xs uppercase tracking-wide"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;