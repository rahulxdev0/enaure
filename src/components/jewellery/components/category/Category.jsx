import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./category.css"
import Loader from "./Loader";
import useMobileCheck from "../../../../hooks/useMobileCheck";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const isMobile = useMobileCheck(768);
  const scrollRef = useRef(null);

  async function getAllCategory() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://admin.enaure.com/api/categories?store=jewellery-store"
      );
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.log("something went wrong", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  // Transform API data to match component structure
  const transformedCategories = categories.map(category => ({
    name: category.name,
    icon: category.image,
    link: `/${category.slug}`
  }));

  const ITEMS_PER_PAGE = isMobile ? 3 : 6;
  const totalPages = Math.ceil(transformedCategories.length / ITEMS_PER_PAGE);

  const scrollToPage = (index) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      
      scrollRef.current.scrollTo({
        left: index * scrollAmount,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const scrollNext = () => {
    if (currentIndex < totalPages - 1) {
      scrollToPage(currentIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      scrollToPage(currentIndex - 1);
    }
  };
  
  useEffect(() => {
    scrollToPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto py-8 md:py-13 bg-white">
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 md:mb-4 font-serif tracking-wide">
            Shop By Category
          </h2>
        </div>
        <div className="text-center text-red-500">
          <p>Failed to load categories: {error}</p>
          <button 
            onClick={() => getAllCategory()}
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      

      <div className="container mx-auto py-8 md:py-13 bg-white relative px-0 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 md:mb-4 font-serif tracking-wide">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-sans text-sm md:text-base px-2">
            Discover our exquisite collection of fine jewelry across different categories
          </p>
        </div>
      
        <div className="relative mx-auto max-w-6xl mobile-category-container"> 
          {/* Scrollable Container */}
          <div 
            ref={scrollRef} 
            className="flex space-x-1 md:space-x-6 justify-start overflow-x-hidden scroll-smooth mx-auto w-full mobile-category-scroll"
          >
            
            {/* Category Items Mapping */}
            {transformedCategories.map((category, index) => (
              <div 
                key={index} 
                className="category-item flex flex-col items-center flex-shrink-0 group cursor-pointer mobile-category-item"
                style={{ 
                  minWidth: isMobile 
                    ? `calc(33.333% - 0.25rem)` 
                    : `calc(100% / ${ITEMS_PER_PAGE} - 1.25rem)` 
                }}
                onClick={() => {
                  // Navigate to category page
                  window.location.href = category.link;
                }}
              >
                {/* Elegant Square Container with Visible Images */}
                <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-lg mb-2 md:mb-3 overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 mobile-category-image">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="category-image w-full h-full object-cover" 
                    onError={(e) => {
                      // Fallback image if the API image fails to load
                      e.target.src = 'https://via.placeholder.com/128?text=Category';
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
                
                {/* Category Name */}
                <span className="text-xs md:text-sm text-gray-800 font-medium uppercase tracking-wider transition-colors duration-300 group-hover:text-amber-700 text-center font-sans mobile-category-name">
                  {category.name}
                </span>
                
                {/* Subtle Underline on Hover */}
                <div className="w-0 h-0.5 bg-amber-600 mt-1 md:mt-2 group-hover:w-4 md:group-hover:w-8 transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          {/* Mobile Navigation Buttons */}
          <button 
            onClick={scrollPrev} 
            disabled={currentIndex === 0} 
            className={`mobile-nav-button hidden md:hidden mobile-nav-button-left text-gray-600 hover:text-amber-700 transition-all duration-200 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-amber-200'}`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button 
            onClick={scrollNext} 
            disabled={currentIndex === totalPages - 1} 
            className={`mobile-nav-button hidden md:hidden mobile-nav-button-right text-gray-600 hover:text-amber-700 transition-all duration-200 ${currentIndex === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-amber-200'}`}
            aria-label="Next categories"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Desktop Navigation Button Left */}
          <button 
            onClick={scrollPrev} 
            disabled={currentIndex === 0} 
            className={`nav-button absolute -left-12 top-1/2 transform -translate-y-1/2 p-3 text-gray-600 hover:text-amber-700 z-10 hidden lg:block bg-white/90 shadow-lg rounded-full border border-gray-100 hover:shadow-xl transition-all duration-200 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-amber-200'}`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Desktop Navigation Button Right */}
          <button 
            onClick={scrollNext} 
            disabled={currentIndex === totalPages - 1} 
            className={`nav-button absolute -right-12 top-1/2 transform -translate-y-1/2 p-3 text-gray-600 hover:text-amber-700 z-10 hidden lg:block bg-white/90 shadow-lg rounded-full border border-gray-100 hover:shadow-xl transition-all duration-200 ${currentIndex === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-amber-200'}`}
            aria-label="Next categories"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Elegant Dots Indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 md:mt-10 space-x-2 mobile-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                aria-label={`Go to category page ${index + 1}`}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500 ${
                  currentIndex === index 
                    ? 'bg-yellow-600 w-4 md:w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;