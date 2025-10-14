import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ProductCard Component
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

      <Link to={`/products/${product.id}`} className="text-inherit no-underline">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={imageError ? '/images/placeholder-jewelry.jpg' : product.image}
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

// ProductGrid Component
const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
    
    {products.length === 0 && (
      <div className="col-span-full text-center py-16 text-gray-600">
        <div className="text-5xl mb-5">💎</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-sm">
          Try adjusting your search or filter criteria
        </p>
      </div>
    )}
  </div>
);

// Main ProductSection Component
const ProductSection = () => {
  // Dummy data
  const dummyProducts = [
    {
      id: 1,
      name: 'Classic Gold Diamond Ring',
      sellerName: 'Luxury Jewelers',
      price: 849.99,
      originalPrice: 999.99,
      rating: 4.5,
      reviewCount: 128,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      offer: 15
    },
    {
      id: 2,
      name: 'Silver Pearl Necklace',
      sellerName: 'Pearl Masters',
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.8,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      offer: 10
    },
    {
      id: 3,
      name: 'Rose Gold Earrings Set',
      sellerName: 'Golden Touch',
      price: 159.99,
      rating: 4.3,
      reviewCount: 67,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'
    },
    {
      id: 4,
      name: 'Platinum Wedding Band',
      sellerName: 'Eternal Rings',
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.9,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      offer: 20
    },
    {
      id: 5,
      name: 'Diamond Tennis Bracelet',
      sellerName: 'Sparkle & Co',
      price: 899.99,
      rating: 4.6,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1588444650700-6c7f0c89d36b?w=400'
    },
    {
      id: 6,
      name: 'Vintage Silver Pendant',
      sellerName: 'Retro Jewels',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.4,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      offer: 8
    },
    {
      id: 7,
      name: 'Gold Hoop Earrings',
      sellerName: 'Modern Gold',
      price: 179.99,
      rating: 4.2,
      reviewCount: 91,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'
    },
    {
      id: 8,
      name: 'Sapphire Engagement Ring',
      sellerName: 'Precious Stones',
      price: 2199.99,
      originalPrice: 2599.99,
      rating: 4.9,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      offer: 15
    }
  ];

  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Calculate pagination
  const totalProducts = dummyProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = dummyProducts.slice(startIndex, startIndex + productsPerPage);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    console.log('Sort by:', value);
    // Sorting logic will be implemented with API
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
        <div className="text-sm text-gray-600">
          Showing {currentProducts.length} of {totalProducts} products
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
      <ProductGrid products={currentProducts} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 pt-6 border-t border-gray-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(currentPage + 1)}
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
    </div>
  );
};

export default ProductSection;