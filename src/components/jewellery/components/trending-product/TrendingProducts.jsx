import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './components/ProductCard';
import ProductQuickViewModal from "../common/ProductQuickViewModal";
import useMobileCheck from "../../../../hooks/useMobileCheck";

const TrendingProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useMobileCheck();

  async function getTrendingProducts() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://admin.enaure.com/api/trending-products?store=jewellery-store"
      );
      const responseData = await response.json();
      const finalData = responseData?.data?.products;
      console.log("data:", finalData);
      setData(finalData || []);
    } catch (error) {
      console.log("something went wrong", error);
      setError("Failed to load trending products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTrendingProducts();
  }, []);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    // You can implement a modal component later
    console.log("Quick view for:", product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numDots);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numDots) % numDots);
  };

  // Calculate number of pages based on products (4 products per page)
  const productsPerPage = 8;
  const numDots = Math.ceil(data.length / productsPerPage) || 1;

  // Get current page products
  const currentProducts = data.slice(
    currentIndex * productsPerPage,
    (currentIndex + 1) * productsPerPage
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-gray-500">
          <p>No trending products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-2xl mb-4">
          TRENDING PRODUCTS
        </h2>
        <div className="flex justify-center items-center mt-2">
          <span className="inline-block w-20 h-1 bg-yellow-600 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-yellow-600 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-yellow-600 rounded-full"></span>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {numDots > 1 && !isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full border border-yellow-500 bg-white text-yellow-500 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full border border-yellow-500 bg-white text-yellow-500 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Mobile Navigation Arrows - Bottom positioned */}
        {numDots > 1 && isMobile && (
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-yellow-500 bg-white text-yellow-500 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Previous products"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex items-center gap-3">
              {Array.from({ length: numDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-yellow-500 scale-125' 
                      : 'bg-gray-300 hover:bg-yellow-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-yellow-500 bg-white text-yellow-500 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg"
              aria-label="Next products"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Pagination Dots - Only show if more than one page */}
        {numDots > 1 && (
          <div className="justify-center items-center gap-3 mt-10 hidden md:flex">
            {Array.from({ length: numDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-yellow-500 scale-125' 
                    : 'bg-gray-300 hover:bg-yellow-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

    </div>
  );
};

export default TrendingProducts;
