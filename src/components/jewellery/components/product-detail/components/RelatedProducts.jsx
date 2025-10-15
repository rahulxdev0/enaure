// src/components/jewellery/components/product-detail/components/RelatedProducts.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ relatedProducts = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  // Debug: Check what data is coming in
  console.log('RelatedProducts received:', relatedProducts);

  // Use only the provided related products from API
  const displayRelatedProducts = relatedProducts && relatedProducts.length > 0 
    ? relatedProducts.slice(0, 8) // Limit to 8 products max
    : [];

  console.log('Display related products:', displayRelatedProducts);

  // Transform API data to match the expected format
  const transformedProducts = displayRelatedProducts.map(rp => ({
    id: rp.id,
    name: rp.name,
    sellerName: rp.brand?.name || 'Unknown Brand',
    price: rp.discounted_price || rp.price,
    originalPrice: rp.price && (rp.discounted_price || rp.price) && parseFloat(rp.price) !== parseFloat(rp.discounted_price || rp.price) ? rp.price : null,
    rating: rp.rating || 4,
    reviewCount: rp.reviews_count || 0,
    image: rp.image_url || '/images/placeholder-jewelry.jpg',
    slug: rp.slug || rp.id,
    offer: rp.price && rp.discounted_price && parseFloat(rp.price) > parseFloat(rp.discounted_price)
      ? Math.round(((parseFloat(rp.price) - parseFloat(rp.discounted_price)) / parseFloat(rp.price)) * 100)
      : null
  }));

  console.log('Transformed products:', transformedProducts);

  const productsPerSlide = 5;
  const totalSlides = Math.ceil(transformedProducts.length / productsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    setImageLoading(prev => ({ ...prev, [productId]: false }));
  };

  const handleImageLoad = (productId) => {
    setImageLoading(prev => ({ ...prev, [productId]: false }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to cart:', product.name);
    alert(`${product.name} added to cart!`);
  };

  // Get current slide products
  const startIndex = currentSlide * productsPerSlide;
  const currentProducts = transformedProducts.slice(startIndex, startIndex + productsPerSlide);

  // Don't show anything if no related products
  if (transformedProducts.length === 0) {
    console.log('No related products to display');
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wide">
        You May Also Like
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {totalSlides > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous products"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Products Grid - Show 5 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 py-3 px-2">
          {currentProducts.map((productItem) => (
            <div key={productItem.id} className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 relative overflow-hidden group">
              {/* Sale Badge */}
              {productItem.offer && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                  {productItem.offer}% OFF
                </div>
              )}

              <Link to={`/product/${productItem.slug}`} className="text-inherit no-underline">
                {/* Product Image */}
                <div className="relative w-full h-48 bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {imageLoading[productItem.id] !== false && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-3 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img 
                    src={imageErrors[productItem.id] ? '/images/placeholder-jewelry.jpg' : productItem.image}
                    alt={productItem.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoading[productItem.id] !== false ? 'opacity-0' : 'opacity-100'
                    }`}
                    onError={() => handleImageError(productItem.id)}
                    onLoad={() => handleImageLoad(productItem.id)}
                  />
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <h3 className="text-sm text-gray-900 font-normal mb-2 line-clamp-2 leading-tight h-9">
                    {productItem.name}
                  </h3>

                  <p className="text-xs text-gray-600 mb-2">
                    By {productItem.sellerName}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="text-amber-400 text-sm">
                      {'★'.repeat(Math.floor(productItem.rating))}
                      {'☆'.repeat(5 - Math.floor(productItem.rating))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      ({productItem.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-lg font-bold text-green-600">
                      ${typeof productItem.price === 'number' ? productItem.price.toFixed(2) : parseFloat(productItem.price).toFixed(2)}
                    </span>
                    {productItem.originalPrice && parseFloat(productItem.originalPrice) > parseFloat(productItem.price) && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${typeof productItem.originalPrice === 'number' ? productItem.originalPrice.toFixed(2) : parseFloat(productItem.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <button 
                onClick={(e) => handleAddToCart(e, productItem)}
                className="w-full py-2 bg-amber-500 text-white border-none rounded text-sm font-bold cursor-pointer transition-colors duration-300 hover:bg-amber-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {totalSlides > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-10"
            aria-label="Next products"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-amber-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;