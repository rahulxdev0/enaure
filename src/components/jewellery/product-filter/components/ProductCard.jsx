import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to cart:', product.name);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 relative overflow-hidden group">
      {/* Sale Badge */}
      {product.offer && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          {product.offer}% OFF
        </div>
      )}

      <Link to={`/jewellery/products/${product.id}`} className="text-inherit no-underline">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={imageError ? 'https://via.placeholder.com/400x300?text=No+Image' : product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="text-sm text-gray-900 font-normal mb-2 line-clamp-2 leading-tight h-9">
            {product.name}
          </h3>

          <p className="text-xs text-gray-600 mb-2">
            By {product.sellerName}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="text-amber-400 text-sm">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-xs text-gray-600 ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-lg font-bold text-green-600">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-2 bg-amber-500 text-white border-none rounded text-sm font-bold cursor-pointer transition-colors duration-300 hover:bg-amber-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;