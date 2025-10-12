// import React, { useEffect, useState } from "react";
// import Loader from "./Loader";

// const TopProducts = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function getTopProducts() {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         "https://admin.enaure.com/api/top-products?store=jewellery-store"
//       );
//       const data = await response.json();
//       const finaData = data?.data?.categories;
//       console.log("data:", finaData);
//       setData(finaData || []);
//     } catch (error) {
//       console.log("something went wrong", error);
//       setError("Failed to load categories");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getTopProducts();
//   }, []);
//   if(loading) return <Loader />
//   return <div>TopProducts</div>;
// };

// export default TopProducts;



import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react";
import Loader from "./Loader";

const TopProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [likedProducts, setLikedProducts] = useState({});

  async function getTopProducts() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://admin.enaure.com/api/top-products?store=jewellery-store"
      );
      const data = await response.json();
      const finalData = data?.data?.categories;
      console.log("data:", finalData);
      setData(finalData || []);
    } catch (error) {
      console.log("something went wrong", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTopProducts();
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const productsPerPage = isMobile ? 1 : 5;

  useEffect(() => {
    setCurrentProductIndex(0);
  }, [currentCategoryIndex, isMobile]);

  const currentCategory = data[currentCategoryIndex];
  const currentProducts = currentCategory?.products || [];
  
  const nextProductSlide = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex + 1 >= currentProducts.length - productsPerPage + 1 ? 0 : prevIndex + 1
    );
  };

  const prevProductSlide = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(currentProducts.length - productsPerPage, 0) : prevIndex - 1
    );
  };

  const nextCategory = () => {
    setCurrentCategoryIndex((prevIndex) => 
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((prevIndex) => 
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleLike = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleQuickView = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Quick view:", product);
    // Implement quick view functionality here
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to cart:", product);
    // Implement add to cart functionality here
  };

  const numDots = Math.max(1, currentProducts.length - productsPerPage + 1);
  const visibleProducts = currentProducts.slice(currentProductIndex, currentProductIndex + productsPerPage);

  // Transform API products to match component structure
  const transformedProducts = visibleProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: parseFloat(product.discounted_price),
    category: currentCategory?.category?.name || 'Jewellery',
    image: product.image_url,
    rating: product.rating || 4,
    reviewsCount: product.reviews_count || 0,
    isFeatured: product.is_featured,
    sale: true,
    originalPrice: parseFloat(product.discounted_price) * 1.2 // Adding 20% as original price for demo
  }));

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div 
      key={product.id} 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 
        hover:shadow-md hover:border-yellow-500 transition-all duration-300 
        text-center relative group flex flex-col
        ${'w-48 flex-shrink-0'}
      `}
      style={{ 
        minHeight: '320px',
        maxHeight: '320px',
        width: '230px'
      }}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.sale && (
          <span className="bg-yellow-300 text-yellow-800 text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Hover Icons - Updated for mobile */}
      <div className={`
        absolute top-2 right-2 z-10 flex flex-col space-y-2
        ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
        transition-opacity duration-300
      `}>
        <button 
          className={`
            w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm
            ${isMobile 
              ? likedProducts[product.id] 
                ? ' text-black shadow-none'
                : 'text-gray-600 bg-white shadow-sm'
              : 'text-gray-600 bg-white hover:bg-yellow-200 hover:text-black shadow-sm'
            }
          `}
          onClick={(e) => handleLike(product.id, e)}
        >
          <Heart 
            className="w-4 h-4" 
            fill={likedProducts[product.id] ? "currentColor" : "none"}
          />
        </button>
        {!isMobile && ( // Hide eye icon on mobile to save space
          <button 
            className="w-8 h-8 flex items-center justify-center text-gray-600 bg-white rounded-full transition-all duration-300 hover:bg-yellow-200 hover:text-black shadow-sm"
            onClick={(e) => handleQuickView(product, e)}
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Product Image */}
      <div className="p-3 flex-1 flex items-center justify-center">
        <div 
          className="image-container flex items-center justify-center overflow-hidden"
          style={{ 
            height: '150px', 
            width: '150px'
          }}
        >
          <img 
            loading="lazy"
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain"
            style={{ 
              height: '150px',
              width: '150px',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150?text=Product';
            }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 pt-0 flex flex-col flex-1 justify-end">
        <h3 className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex justify-center items-center mb-1">
          <div className="star-rating inline-block relative text-gray-300 text-sm">
            <span 
              className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-yellow-400"
              style={{ width: `${(product.rating / 5) * 100}%` }}
            >
              ★★★★★
            </span>
            ★★★★★
          </div>
          {product.reviewsCount > 0 && (
            <span className="text-sm text-gray-500 ml-1">({product.reviewsCount})</span>
          )}
        </div>
        
        <div className="mb-3">
          <span className="text-lg font-semibold text-yellow-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <button 
          onClick={(e) => handleAddToCart(product, e)}
          className={`
            bg-gradient-to-r mb-6 from-yellow-200 to-yellow-400 text-black text-xs font-semibold 
            w-full py-2 rounded-lg uppercase transition-all duration-300 
            hover:from-yellow-300 hover:to-yellow-500 hover:shadow-md
            active:from-yellow-300 active:to-yellow-500 active:shadow-md
          `}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  if (loading) return <Loader />;

  // Show error state
  if (error) {
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">TOP PRODUCTS</h2>
          </div>
          <div className="text-center text-red-500">
            <p>Failed to load products: {error}</p>
            <button 
              onClick={getTopProducts}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!data.length) {
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">TOP PRODUCTS</h2>
          </div>
          <div className="text-center text-gray-500">
            <p>No products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-2xl mb-4">TOP PRODUCTS</h2>
          <div className="flex items-center space-x-1 mb-2">
            <span className="inline-block w-16 md:w-20 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-2 md:w-3 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-yellow-600 rounded-full"></span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="tabset section-tabset section-tabs-component flex justify-center mb-6 md:mb-8 space-x-1 md:space-x-2 overflow-x-auto py-2">
          {data.map((item, index) => (
            <div 
              key={item.category.slug}
              className={`tab section-tab-item cursor-pointer px-4 md:px-10 py-2 text-xs md:text-sm font-medium rounded-sm whitespace-nowrap flex-shrink-0 ${
                currentCategoryIndex === index 
                  ? 'bg-white border border-yellow-500 text-yellow-500' 
                  : 'bg-gray-200 text-gray-900'
              }`}
              onClick={() => setCurrentCategoryIndex(index)}
            >
              <span className="txt">{item.category.name}</span>
            </div>
          ))}
        </div>

        {/* Category Navigation for Mobile */}
        {isMobile && data.length > 1 && (
          <div className="flex justify-center items-center gap-4 mb-4">
            <button 
              onClick={prevCategory}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {currentCategory?.category?.name}
            </span>
            <button 
              onClick={nextCategory}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative max-w-8xl mx-auto">
          {/* Product Navigation Buttons */}
          {currentProducts.length > productsPerPage && (
            <>
              <button 
                onClick={prevProductSlide}
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10 transition-colors ${
                  isMobile 
                    ? 'left-2 bg-white/80 p-1 rounded-full shadow-md' 
                    : 'left-[-20px] text-2xl'
                }`}
              >
                <ChevronLeft className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
              </button>
              
              <button 
                onClick={nextProductSlide}
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10 transition-colors ${
                  isMobile 
                    ? 'right-2 bg-white/80 p-1 rounded-full shadow-md' 
                    : 'right-[-20px] text-2xl'
                }`}
              >
                <ChevronRight className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className={`flex justify-center gap-4 ${isMobile ? 'px-8' : 'px-4'}`}>
            {transformedProducts.length > 0 ? (
              <div className="flex gap-4 justify-center flex-wrap">
                {transformedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No products found for this category.
              </div>
            )}
          </div>
        </div>

        {/* Dots Indicator for Products */}
        {numDots > 1 && (
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {Array.from({ length: numDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentProductIndex === index 
                    ? 'bg-yellow-500 scale-125' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Category Dots Indicator for Mobile */}
        {isMobile && data.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategoryIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentCategoryIndex === index 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          /* Hide scrollbar for tabs but allow scrolling */
          .section-tabs-component {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .section-tabs-component::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default TopProducts;