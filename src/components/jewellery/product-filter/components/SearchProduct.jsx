import React, { useState } from 'react';

const SearchProduct = ({getSearchValue, isLoading = false}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    console.log('Search query:', query);
    
    getSearchValue(query)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    handleSearch('');
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-200 py-5 mb-5">
      <div className="container max-w-6xl mx-auto px-5">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 text-center">
          Luxury Jewelry Collection
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Discover our exquisite collection of handcrafted jewelry pieces
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for rings, necklaces, earrings..."
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-amber-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                )}
              </button>
            </div>
            
            {searchQuery && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 bg-gray-600 text-white border-none rounded text-sm cursor-pointer hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchProduct;