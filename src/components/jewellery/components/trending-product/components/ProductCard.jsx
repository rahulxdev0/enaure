import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    

  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div 
      className={`
        border border-gray-300 p-4 h-48 transition-all duration-300 bg-white relative group 
        ${isHovered ? 'border-yellow-500 shadow-lg -translate-y-1' : 'hover:border-yellow-500 hover:shadow-lg hover:-translate-y-1'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale/Popular Labels */}
      {product.is_featured && (
        <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded uppercase z-10">
          Featured
        </span>
      )}
      {product.isOnSale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded uppercase z-10">
          Sale
        </span>
      )}

      <div className="flex items-center h-full">
        {/* Product Image */}
        <div className="w-2/5 flex-shrink-0 mr-4 flex justify-center items-center">
          {!imageLoaded && (
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={product.image_url} 
            alt={product.name}
            className={`max-w-full max-h-24 w-auto h-auto transition-transform duration-300 ${
              isHovered ? 'scale-105' : ''
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Info */}
        <div className="w-3/5 flex flex-col justify-between h-full">
          <div>
            {/* Category */}
            {product.category_id && (
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Category {product.category_id}
              </p>
            )}

            {/* Product Name */}
            <h4 className={`text-sm font-semibold mb-2 line-clamp-2 uppercase transition-colors ${
              isHovered ? 'text-yellow-600' : 'text-gray-800'
            }`}>
              {product.name}
            </h4>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-2">
              {renderStars(product.rating)}
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviews_count})
              </span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="mt-auto">
            <div className="text-yellow-600 font-normal text-base mb-16 font-sans">
              ₹{parseFloat(product.discounted_price).toFixed(2)}
            </div>
            
            {/* Action Container - Icons appear on hover */}
            <div className="flex justify-between items-center">
              {/* Left side - Heart and Eye icons (hidden by default, visible on hover) */}
              <div className={`flex gap-2 transition-all duration-300 absolute bottom-5 left-4`}>
                <button
                  className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  title="Add to Wishlist"
                  onClick={toggleWishlist}
                >
                  <Heart 
                    size={12} 
                    className={isWishlisted ? 'fill-current text-red-500' : ''}
                  />
                </button>

                <button
                  className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
                  title="Quick View"
                  onClick={handleQuickView}
                >
                  <Eye size={12} />
                </button>
              </div>

              {/* Right side - Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-yellow-200 to-yellow-400 text-black text-xs absolute bottom-5 right-4 font-semibold px-2 py-2 rounded uppercase min-w-[100px] transition-all duration-300 hover:from-yellow-300 hover:to-yellow-500 hover:shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;