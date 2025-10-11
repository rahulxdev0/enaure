import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import CategoryCard from './CategoryCard';
import ProductCard from './ProductCard';
import Loader from './Loader';

const DepartmentPage = ({ 
  departmentName, 
  departmentDescription, 
  categories, 
  heroColor,
  icon: Icon 
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Mock products - replace with RTK Query hook
  const mockProducts = [
    { id: 1, name: 'Premium Product 1', price: 299.99, rating: 4.5, discount: 20, image: null },
    { id: 2, name: 'Exclusive Product 2', price: 399.99, rating: 5, discount: null, image: null },
    { id: 3, name: 'Luxury Product 3', price: 499.99, rating: 4.8, discount: 15, image: null },
    { id: 4, name: 'Designer Product 4', price: 199.99, rating: 4.2, discount: null, image: null },
    { id: 5, name: 'Premium Product 5', price: 599.99, rating: 4.9, discount: 25, image: null },
    { id: 6, name: 'Special Product 6', price: 349.99, rating: 4.6, discount: 10, image: null },
  ];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${heroColor} text-white py-20`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <Icon className="w-12 h-12 mr-4" />
              <h1 className="text-5xl font-bold">{departmentName}</h1>
            </div>
            <p className="text-xl text-white/90">{departmentDescription}</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === 'all'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <span className="font-semibold">All Products</span>
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category.name.toLowerCase())}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.name.toLowerCase()
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <span className="font-semibold">{category.name}</span>
                <p className="text-sm text-gray-600 mt-1">{category.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <p className="text-gray-600 mt-1">{mockProducts.length} products found</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <Loader />
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && mockProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DepartmentPage;
