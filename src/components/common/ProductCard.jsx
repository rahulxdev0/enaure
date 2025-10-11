import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { name, price, image, rating, discount } = product;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/300'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
          <button className="bg-white p-3 rounded-full hover:bg-emerald-500 hover:text-white transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-emerald-500 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>
        
        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({rating})</span>
          </div>
        )}

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-emerald-600">${price}</p>
            {discount && (
              <p className="text-sm text-gray-500 line-through">
                ${(price / (1 - discount / 100)).toFixed(2)}
              </p>
            )}
          </div>
          <button className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
