// import React from 'react'
// import { useGetBrandsQuery } from '../../../../store/api/jewellery/homeApiEndpoints'

// const Brand = () => {
//   const {data, isLoading: isLoadingBrand, isError} = useGetBrandsQuery();
//   const brandData = data?.data || [];
  
//   return (
//     <div>Brand</div>
//   )
// }

// export default Brand


import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetBrandsQuery } from "../../../../store/api/jewellery/homeApiEndpoints";
import useMobileCheck from "../../../../hooks/useMobileCheck";
import './brand.css';

const Brand = () => {
  const { data: brandsResponse = {}, isLoading, error } = useGetBrandsQuery();
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMobileCheck(768);

  // Safely transform API data - brands are nested under data property
  const transformedBrands = Array.isArray(brandsResponse?.data) 
    ? brandsResponse.data.map(brand => ({
        id: brand.id,
        name: brand.slug.charAt(0).toUpperCase() + brand.slug.slice(1).replace(/-/g, ' '),
        src: brand.logo,
        link: `https://enovathemes.com/joice/shop/?brand=${brand.slug}&ajax=true`
      }))
    : [];

  const BRANDS_PER_PAGE = 4;
  const totalPages = Math.ceil(transformedBrands.length / BRANDS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentBrands = transformedBrands.slice(
    currentPage * BRANDS_PER_PAGE,
    (currentPage + 1) * BRANDS_PER_PAGE
  );

  // Handle mobile tap for hover effect
  const handleMobileTap = (e) => {
    if (isMobile) {
      const brandItem = e.currentTarget;
      brandItem.style.borderColor = '#fef08a';
      brandItem.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      
      setTimeout(() => {
        brandItem.style.borderColor = '';
        brandItem.style.boxShadow = '';
      }, 300);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="elementor-element e-flex e-con-boxed e-con e-parent e-lazyloaded brands-container">
        <div className="e-con-inner brands-inner-container">
          <div className="brands-section-header">
            <h2 className="brands-title">
              SHOP BY BRANDS
            </h2>
            <div className="brands-divider">
              <span className="brands-divider-line brands-divider-line-long"></span>
              <span className="brands-divider-line brands-divider-line-medium"></span>
              <span className="brands-divider-line brands-divider-line-short"></span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse brands-loading-grid">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="brands-loading-item">
                  <div className="brands-loading-image"></div>
                  <div className="brands-loading-text"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="elementor-element e-flex e-con-boxed e-con e-parent e-lazyloaded brands-container">
        <div className="e-con-inner brands-inner-container">
          <div className="brands-section-header">
            <h2 className="brands-title">
              SHOP BY BRANDS
            </h2>
          </div>
          <div className="brands-error-container">
            <p>Failed to load brands</p>
            <button 
              onClick={() => window.location.reload()}
              className="brands-retry-button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no brands
  if (!transformedBrands.length) {
    return (
      <div className="elementor-element e-flex e-con-boxed e-con e-parent e-lazyloaded brands-container">
        <div className="e-con-inner brands-inner-container">
          <div className="brands-section-header">
            <h2 className="brands-title">
              SHOP BY BRANDS
            </h2>
          </div>
          <div className="brands-error-container">
            <p>No brands available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="elementor-element e-flex e-con-boxed e-con e-parent e-lazyloaded brands-container">
      <div className="e-con-inner brands-inner-container">
        
        {/* Section Header - Centered Above Brands */}
        <div className="brands-section-header">
          <h2 className="brands-title">
            SHOP BY BRANDS
          </h2>
          <div className="brands-divider">
            <span className="brands-divider-line brands-divider-line-long"></span>
            <span className="brands-divider-line brands-divider-line-medium"></span>
            <span className="brands-divider-line brands-divider-line-short"></span>
          </div>
        </div>

        <div className="elementor-element elementor-widget elementor-widget-et_clients">
          <div className="elementor-widget-container">
            
            {/* Desktop Version with Navigation */}
            <div className="hidden md:block relative">
              <div 
                className="et-clients" 
                data-carousel-gatter="8" 
                data-carousel-rows="2" 
                data-carousel-columns="5"
              >
                <div className="flex justify-center">
                  <div className="brands-desktop-grid">
                    {transformedBrands.slice(0, 5).map((brand, index) => (
                      <div 
                        key={brand.id}
                        className="clients-item flex justify-center items-center"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          {/* First row */}
                          <div className="brand-item flex justify-center items-center h-24 w-48 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                            <a 
                              href={brand.liink} 
                              title={brand.name}
                              className="block p-4 w-full h-full flex items-center justify-center"
                            >
                              <img 
                                decoding="async" 
                                src={brand.src} 
                                alt={brand.name} 
                                className="brand-image"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150x60?text=Brand';
                                }}
                              />
                            </a>
                          </div>
                          
                          {/* Second row - next brand */}
                          {transformedBrands[index + 5] && (
                            <div className="brand-item flex justify-center items-center h-24 w-48 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                              <a 
                                href={transformedBrands[index + 5].link} 
                                title={transformedBrands[index + 5].name}
                                className="block p-4 w-full h-full flex items-center justify-center"
                              >
                                <img 
                                  decoding="async" 
                                  src={transformedBrands[index + 5].src} 
                                  alt={transformedBrands[index + 5].name} 
                                  className="brand-image"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/150x60?text=Brand';
                                  }}
                                />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Navigation Arrows */}
              {transformedBrands.length > 10 && (
                <>
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 0} 
                    className={`brands-nav-button ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-yellow-300'}`}
                    aria-label="Previous brands"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages - 1} 
                    className={`brands-nav-button brands-nav-button-right ${currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-yellow-300'}`}
                    aria-label="Next brands"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile Version - 2x2 Grid with Navigation */}
            <div className="md:hidden brands-mobile-container">
              <div className="brands-mobile-grid">
                {currentBrands.map((brand) => (
                  <div 
                    key={brand.id}
                    className="clients-item flex justify-center items-center"
                  >
                    <div 
                      className="brand-item flex justify-center items-center h-20 w-full bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
                      onClick={handleMobileTap}
                    >
                      <a 
                        href={brand.linnk} 
                        title={brand.name}
                        className="block p-4 w-full h-full flex items-center justify-center"
                      >
                        <img 
                          decoding="async" 
                          src={brand.src} 
                          alt={brand.name} 
                          className="brand-image brand-image-mobile"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/120x40?text=Brand';
                          }}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Navigation Arrows */}
              {transformedBrands.length > BRANDS_PER_PAGE && (
                <>
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 0} 
                    className={`brands-nav-button brands-nav-button-left brands-nav-button-mobile ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-yellow-300'}`}
                    aria-label="Previous brands"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages - 1} 
                    className={`brands-nav-button brands-nav-button-right brands-nav-button-mobile ${currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-yellow-300'}`}
                    aria-label="Next brands"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator for Mobile */}
            {totalPages > 1 && (
              <div className="brands-dots-container brands-dots-mobile">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to brand page ${index + 1}`}
                    className={`brands-dot ${currentPage === index ? 'brands-dot-active' : ''}`}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;