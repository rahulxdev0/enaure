import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingCart, Star, Minus, Plus } from 'lucide-react';

const ProductQuickViewModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset quantity when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    console.log('Adding to cart:', { product, quantity });
    // Add your cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { product, quantity });
    // Add your buy now logic here
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-none w-full max-w-4xl max-h-[85vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-amber-300 hover:text-black transition-colors shadow-md"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Product Image Section */}
          <div className="bg-gray-50 p-8 flex items-center justify-center min-h-[500px]">
            <div className="max-w-xs w-full">
              <img
                src={product.image_url || product.image}
                alt={product.name || product.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>          {/* Product Details Section */}
          <div className="p-8 flex items-center">
            <div className="w-full max-w-sm">
              {/* Product Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4 uppercase leading-tight">
                {product.name || product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < (product.rating || 4) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews_count || 0})
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-yellow-600 mb-6">
                ${parseFloat(product.discounted_price || product.price || 0).toFixed(2)}
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-sm">
                  Experience timeless elegance with our {product.name || product.title}. 
                  Crafted with precision and attention to detail, this piece showcases 
                  exceptional quality and stunning design.
                </p>
              </div>

              {/* Product Meta */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 w-24">SKU:</span>
                  <span className="text-sm text-gray-600">{product.slug || 'N/A'}</span>
                </div>
                {product.category_id && (
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900 w-24">Category:</span>
                    <span className="text-sm text-gray-600">Category {product.category_id}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 w-24">Availability:</span>
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-gray-900 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-yellow-200 to-yellow-400 text-black font-semibold py-4 px-6 rounded-sm uppercase transition-all duration-300 hover:from-yellow-300 hover:to-yellow-500 hover:shadow-md flex items-center justify-center gap-3 text-sm"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-black text-white font-semibold py-4 px-6 rounded-sm uppercase transition-all duration-300 hover:bg-gray-800 hover:shadow-md flex items-center justify-center gap-3 text-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render modal at document body level
  return createPortal(modalContent, document.body);
};

export default ProductQuickViewModal;