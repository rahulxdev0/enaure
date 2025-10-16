import React, { useState } from 'react';
import ProductGrid from './ProductGrid';

const ProductSection = ({ productData = [], isLoading = false, currentPage = 1, onPageChange }) => {
  
  
  const [sortBy, setSortBy] = useState('featured');
  
  // Transform API data to match ProductCard props
  const transformedProducts = productData.map(product => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    sellerName: 'Enaure Jewelry', // Default seller name since not in API
    price: parseFloat(product.discounted_price),
    originalPrice: product.original_price ? parseFloat(product.original_price) : null,
    rating: product.rating || 0,
    reviewCount: product.reviews_count || 0,
    image: product.image_url,
    offer: product.discount_percentage || null,
    stones: product.stones
  }));

  console.log("transformed data:", transformedProducts);
  const totalProducts = transformedProducts.length;
  const totalPages = 1; // This should come from API pagination metadata

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    console.log('Sort by:', value);
    // Sorting logic will be implemented with API
  };

  return (
    <div className="flex-1">
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {totalProducts} product{totalProducts !== 1 ? 's' : ''}
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={transformedProducts} />

          {/* Pagination */}
          {totalPages > 1 && onPageChange && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border border-gray-300 rounded bg-white text-sm transition-colors ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border border-gray-300 rounded bg-white text-sm transition-colors ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSection;