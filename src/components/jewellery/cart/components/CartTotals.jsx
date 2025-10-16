import React from 'react';
import useMobileCheck from '../../../../hooks/useMobileCheck';

const CartTotals = ({ subtotal, total, onCheckout, onContinueShopping }) => {
  const isMobile = useMobileCheck();

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${isMobile ? '' : 'sticky top-8'}`}>
      <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-4`}>CART TOTALS</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700`}>Subtotal</span>
          <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-gray-900`}>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-700`}>Total</span>
          <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <button 
          onClick={onCheckout} 
          className="w-full py-3 bg-yellow-600 text-white hover:bg-gray-800 transition-colors font-medium text-lg"
        >
          {isMobile ? 'Checkout' : 'Proceed to Checkout'}
        </button>
        <button 
          onClick={onContinueShopping} 
          className="w-full px-8 py-3 text-black bg-gray-200 hover:bg-black hover:text-white transition-colors font-medium text-lg"
        >
          {isMobile ? 'Continue' : 'Continue Shopping'}
        </button>
      </div>
    </div>
  );
};

export default CartTotals;