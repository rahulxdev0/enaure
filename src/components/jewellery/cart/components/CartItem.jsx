import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import useMobileCheck from '../../../../hooks/useMobileCheck';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const isMobile = useMobileCheck();

  if (isMobile) {
    return (
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-3">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-16 h-16 object-cover rounded border border-gray-200 flex-shrink-0" 
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 pr-2">{item.name}</h3>
              <button 
                onClick={() => onRemove(item.id)} 
                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</span>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              
              <span className="text-sm font-bold text-gray-900">${item.subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 items-start md:items-center">
        {/* Product Info */}
        <div className="col-span-5 flex items-center space-x-4 mb-4 md:mb-0">
          <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border border-gray-200" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 text-center mb-4 md:mb-0">
          <span className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</span>
        </div>

        {/* Quantity */}
        <div className="col-span-3 flex justify-center mb-4 md:mb-0">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-lg font-medium min-w-12 text-center">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="col-span-2 text-center">
          <span className="text-lg font-bold text-gray-900">${item.subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;