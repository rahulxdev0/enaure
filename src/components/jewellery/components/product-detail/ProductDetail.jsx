//src/components/jewellery/components/product-detail/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../../../components/common/Loader'; 
import ProductImages from "./components/ProductImages"; 
import ProductInfo from "./components/ProductInfo"; 
import ProductReviews from "./components/ProductReviews";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const product = {
    name: '9CT WHITE GOLD 0.33CT TOTAL DIAMOND ETERNITY RING',
    sku: 'CDY721',
    originalPrice: '289.00',
    price: '245.00',
    rating: 5,
    reviewCount: 1,
    material: 'Gold',
    color: 'White',
    stone: 'Diamond',
    brand: 'Eastern',
    shortDescription: "Crafted in stunning 9-carat yellow gold, this ring bears the timeless message of affection with its engraved declaration: 'I love you'.",
    description: `Radiating warmth and elegance, this 9CT yellow gold ring serves as a tangible symbol of devotion, featuring the heartfelt sentiment "I Love You" inscribed with exquisite detail. Fashioned from lustrous 9-carat yellow gold, this ring encapsulates the essence of love with its endearing inscription, "I Love You", making it a cherished token of affection.

This captivating ring, rendered in 9CT yellow gold, captures the essence of romance with its delicate engraving, spelling out the profound declaration "I Love You", expressing love in a timeless and elegant manner.`,
    features: [
      'Exquisite Craftsmanship',
      'Customization Options',
      'Exceptional Value',
    ],
    images: ['/images/ring-main.png']
  };
  
  const loading = false;
  const error = null;
  const [activeTab, setActiveTab] = useState('description');

  if (loading) return <Loader />;
  if (error || !product) return <div className="text-center p-8">Product not found</div>;

  const Breadcrumb = () => (
    <nav className="breadcrumb mb-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
        <li><Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link></li>
        <li className="text-gray-400">›</li>
        <li><Link to="/shop" className="hover:text-yellow-600 transition-colors">Shop</Link></li>
        <li className="text-gray-400">›</li>
        <li><Link to="/rings" className="hover:text-yellow-600 transition-colors">Rings</Link></li>
        <li className="text-gray-400">›</li>
        <li className="text-gray-500 truncate max-w-[200px]">9ct white gold 0.33ct total diamond eternity ring</li>
      </ol>
    </nav>
  );

  // Related Products Data
  const relatedProducts = [
    { 
      name: 'BABO CHAIN MASSIVE RING', 
      price: '$81.00',
      image: '/images/ring-1.jpg'
    },
    { 
      name: 'ANGEL WING RING', 
      price: '$52.00',
      image: '/images/ring-2.jpg'
    },
    { 
      name: 'CALEN/FREEDOM RING WITH 5 STONES', 
      price: '$66.50',
      image: '/images/ring-3.jpg'
    },
    { 
      name: '9CT WHITE GOLD LOVE YOU RING', 
      price: 'From $50.00', 
      rating: '★★★★ 3',
      image: '/images/ring-4.jpg'
    },
    { 
      name: 'CANDY SHOP RING', 
      price: '$74.00',
      image: '/images/ring-5.jpg'
    }
  ];

  // Recently Viewed Products Data
  const recentlyViewedProducts = [
    { 
      name: '9CT WHITE GOLD I LOVE YOU RING', 
      price: 'From $50.00', 
      rating: '★★★★★ 3',
      image: '/images/ring-6.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb />
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 px-1 font-semibold text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'description' 
                    ? 'border-yellow-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 px-1 font-semibold text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-yellow-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Customer Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'description' && (
              <div className="space-y-12">
                {/* Description Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Description Text */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
                      Description
                    </h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-gray-800 font-medium">{product.shortDescription}</p>
                      {product.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-sm">{paragraph}</p>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        Features
                      </h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Product Information Sidebar */}
                  <div className="bg-gray-50 rounded-lg p-6 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                      Product Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700 text-sm">Material</span>
                        <span className="text-gray-900 text-sm">{product.material}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700 text-sm">Color</span>
                        <span className="text-gray-900 text-sm">{product.color}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700 text-sm">Stone</span>
                        <span className="text-gray-900 text-sm">{product.stone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-semibold text-gray-700 text-sm">Brand</span>
                        <span className="text-gray-900 text-sm">{product.brand}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Products */}
                <div className="border-t border-gray-200 pt-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wide">
                    Related Products
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {relatedProducts.map((productItem, index) => (
                      <div key={index} className="group text-center bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="bg-gray-100 rounded-lg p-6 mb-3 flex items-center justify-center h-32">
                          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs">
                            Image
                          </div>
                        </div>
                        <h3 className="text-sm font-normal text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                          {productItem.name}
                        </h3>
                        {productItem.rating && (
                          <div className="text-yellow-400 text-xs mb-2">
                            {productItem.rating}
                          </div>
                        )}
                        <div className="text-green-600 font-bold text-sm mb-3">
                          {productItem.price}
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors w-full py-2 border-t border-gray-100">
                          {productItem.price.startsWith('From') ? 'Select options →' : 'Add to cart →'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-12">
                <ProductReviews product={product} />
                
                {/* Recently Viewed Products */}
                <div className="border-t border-gray-200 pt-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wide">
                    Recently Viewed Products
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {recentlyViewedProducts.map((productItem, index) => (
                      <div key={index} className="group text-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center h-40">
                          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">
                            Image
                          </div>
                        </div>
                        <h3 className="text-base font-normal text-gray-900 mb-3">
                          {productItem.name}
                        </h3>
                        {productItem.rating && (
                          <div className="text-yellow-400 text-sm mb-3">
                            {productItem.rating}
                          </div>
                        )}
                        <div className="text-green-600 font-bold text-lg mb-4">
                          {productItem.price}
                        </div>
                        <button className="w-full py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-colors">
                          Select options →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;