import React, { useState, useEffect } from 'react';
import useMobileCheck from '../../../../hooks/useMobileCheck';

const OrderSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const isMobile = useMobileCheck();

  // Mock cart data - replace with your actual data source
  useEffect(() => {
    const mockOrderItems = [
      { id: 1, name: '9CT white gold diamond twisted eternity ring', quantity: 1, price: 119.00 },
      { id: 2, name: '9CT white gold cubic zirconia solitaire ring', quantity: 1, price: 99.00 },
      { id: 3, name: '9CT white gold 0.33ct total diamond eternity ring', quantity: 2, price: 245.00 },
      { id: 4, name: '9CT white gold 0.25ct total diamond solitaire ring', quantity: 4, price: 24.99 }
    ];
    setOrderItems(mockOrderItems);
  }, []);

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0.00; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${isMobile ? '' : 'sticky top-8'}`}>
      <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-4`}>Your order</h2>

      {/* Order Items */}
      <div className="border-b border-gray-200 pb-3 mb-3">
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-1">
            <div className="flex-1">
              <p className={`text-gray-900 line-clamp-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {item.name} × {item.quantity}
              </p>
            </div>
            <span className={`font-bold text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'} flex-shrink-0 ml-2`}>
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-b border-gray-200 pb-3 mb-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-gray-700`}>Subtotal</span>
          <span className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-gray-900`}>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-gray-700`}>Shipping</span>
          <span className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-gray-900`}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>Total</span>
          <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-4">
        <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900 mb-3`}>Payment methods</h3>
        
        <div className="space-y-2">
          {/* Direct Bank Transfer */}
          <div className="flex items-start space-x-2">
            <input
              type="radio"
              id="bank-transfer"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 text-yellow-600 focus:ring-yellow-500"
            />
            <label htmlFor="bank-transfer" className="text-gray-700 flex-1">
              <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>Direct bank transfer</span>
              <p className="text-gray-500 mt-1 leading-tight" style={{fontSize: '0.7rem'}}>
                Make your payment directly into our bank account. Please use your Order ID as the payment reference.
              </p>
            </label>
          </div>

          {/* Global Payments */}
          <div className="flex items-start space-x-2">
            <input
              type="radio"
              id="global-payments"
              name="paymentMethod"
              value="global"
              checked={paymentMethod === 'global'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 text-yellow-600 focus:ring-yellow-500"
            />
            <label htmlFor="global-payments" className={`font-medium text-gray-700 ${isMobile ? 'text-sm' : 'text-base'}`}>
              Global payments
            </label>
          </div>

          {/* Cash on Delivery */}
          <div className="flex items-start space-x-2">
            <input
              type="radio"
              id="cash-delivery"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 text-yellow-600 focus:ring-yellow-500"
            />
            <label htmlFor="cash-delivery" className={`font-medium text-gray-700 ${isMobile ? 'text-sm' : 'text-base'}`}>
              Cash on delivery
            </label>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 text-yellow-600 focus:ring-yellow-500"
            required
          />
          <label htmlFor="agree-terms" className="text-gray-700 flex-1">
            <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>I have read and agree to the website terms and conditions *</span>
            <p className="text-gray-500 mt-1 leading-tight" style={{fontSize: '0.7rem'}}>
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>
          </label>
        </div>
      </div>

      {/* Privacy Policy Note */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
        <p className="text-yellow-800 leading-relaxed" style={{fontSize: '0.7rem'}}>
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy. This includes processing payments, shipping, and providing customer support. Please note that for communication purposes and order processing, we may share necessary information with our partners and shipping carriers.
        </p>
      </div>

      {/* Place Order Button */}
      <button
        disabled={!agreeTerms || orderItems.length === 0}
        className={`w-full py-3 font-bold ${isMobile ? 'text-base' : 'text-lg'} transition-colors ${
          agreeTerms && orderItems.length > 0
            ? 'bg-yellow-600 text-white hover:bg-black' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Place order
      </button>
    </div>
  );
};

export default OrderSummary;