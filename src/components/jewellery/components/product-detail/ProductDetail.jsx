
// src/components/jewellery/components/product-detail/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../../../components/common/Loader'; 
import ProductImages from "./components/ProductImages"; 
import ProductInfo from "./components/ProductInfo"; 
import ProductReviews from "./components/ProductReviews";
import useMobileCheck from "../../../../hooks/useMobileCheck";
import { useGetProductBySlugQuery, useGetProductCombinationQuery } from '../../../../store/api/productsApi';
import RelatedProducts from "./components/RelatedProducts"; 

const ProductDetail = () => {
  const { productSlug, combinationId } = useParams();
  const navigate = useNavigate();
  const isMobile = useMobileCheck();
  
  // Use the actual API call
  const { data: productData, isLoading, error } = useGetProductBySlugQuery(productSlug);
  
  // Fetch combination data if combinationId is present in URL
  const { data: combinationData } = useGetProductCombinationQuery(
    { slug: productSlug, combinationId },
    { skip: !combinationId }
  );

  const [activeTab, setActiveTab] = useState('description');
  const [selectedCombination, setSelectedCombination] = useState(null);

  // Update URL when combination is selected - Navigate to new URL
  const handleCombinationSelect = (combination) => {
    setSelectedCombination(combination);
    
    if (combination) {
      // Navigate to the new URL with combination in path
      navigate(`/product/${productSlug}/combination/${combination.combination_id}`);
    } else {
      // Navigate back to base product URL
      navigate(`/product/${productSlug}`);
    }
  };

  // Effect to set initial combination from URL or first available combination
  useEffect(() => {
    if (productData && productData.available_combinations) {
      let initialCombination = null;
      
      if (combinationId) {
        // Find combination from URL parameter
        initialCombination = productData.available_combinations.find(
          combo => combo.combination_id.toString() === combinationId
        );
      }
      
      // If no combination from URL, use first available combination (optional)
      // You can remove this if you don't want to auto-select first combination
      if (!initialCombination && productData.available_combinations.length > 0) {
        initialCombination = productData.available_combinations[0];
      }
      
      setSelectedCombination(initialCombination);
    }
  }, [productData, combinationId]);

  // Transform API data to match component expectations
  const transformProductData = (data) => {
    if (!data) return null;
    
    // Use combination data if available, otherwise use base product data
    const sourceData = combinationData || data;
    
    return {
      id: sourceData.id,
      name: sourceData.name,
      slug: sourceData.slug,
      sku: sourceData.sku || 'N/A',
      description: sourceData.description,
      shortDescription: sourceData.short_description,
      price: sourceData.discounted_price || sourceData.price,
      originalPrice: sourceData.price,
      rating: 5,
      reviewCount: sourceData.reviews_count || 1,
      material: sourceData.jewellery_details?.material || 'N/A',
      color: sourceData.jewellery_details?.stone_type || 'N/A',
      stone: sourceData.jewellery_details?.stone_type || 'N/A',
      brand: sourceData.brand?.name || 'N/A',
      category: sourceData.category?.name || 'N/A',
      images: sourceData.images || [],
      specifications: sourceData.specifications ? JSON.parse(sourceData.specifications) : [],
      features: [
        'Exquisite Craftsmanship',
        'Customization Options',
        'Exceptional Value',
      ],
      availableCombinations: data.available_combinations || [], // Always from base product
      relatedProducts: sourceData.related_products || [],
      stockQuantity: sourceData.stock_quantity,
      stockStatus: sourceData.stock_status,
      weight: sourceData.weight,
      dimensions: {
        length: sourceData.length,
        width: sourceData.width,
        height: sourceData.height
      },
      has_variant: data.has_variant // Add this for variant detection
    };
  };

  const product = transformProductData(productData);

  // Variant Images Gallery Component
  const VariantImagesGallery = ({ product, selectedCombination, onCombinationSelect }) => {
    if (!product.availableCombinations || product.availableCombinations.length === 0) {
      return null;
    }

    // Get unique variant images from combinations
    const variantImages = product.availableCombinations
      .filter(combo => combo.primary_image)
      .map(combo => ({
        id: combo.combination_id,
        image_url: combo.primary_image,
        variant_name: combo.variant?.variant_value?.name,
        price: combo.discounted_price || combo.price,
        combination: combo
      }));

    if (variantImages.length === 0) {
      return (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Available Variants</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {product.availableCombinations.map((combo, index) => (
              <button
                key={combo.combination_id}
                onClick={() => onCombinationSelect(combo)}
                className={`p-3 border rounded-lg text-center ${
                  selectedCombination?.combination_id === combo.combination_id 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-sm font-medium">{combo.variant?.variant_value?.name}</div>
                <div className="text-green-600 font-bold">${combo.discounted_price || combo.price}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Available Variants</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {variantImages.map((variant, index) => (
            <div 
              key={variant.id}
              className={`text-center cursor-pointer transition-all duration-200 ${
                selectedCombination?.combination_id === variant.id 
                  ? 'ring-2 ring-yellow-500 transform scale-105' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onCombinationSelect(variant.combination)}
            >
              <div className="bg-gray-100 rounded-lg p-3 mb-2 flex items-center justify-center h-24">
                <img 
                  src={variant.image_url} 
                  alt={variant.variant_name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="text-xs font-medium text-gray-700 mb-1">
                {variant.variant_name}
              </div>
              <div className="text-sm font-bold text-green-600">
                ${variant.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Breadcrumb = () => (
    <nav className="breadcrumb mb-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
        <li><Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link></li>
        <li className="text-gray-400">›</li>
        <li><Link to="/shop" className="hover:text-yellow-600 transition-colors">Shop</Link></li>
        <li className="text-gray-400">›</li>
        <li><Link to={`/category/${product.category?.toLowerCase()}`} className="hover:text-yellow-600 transition-colors">
          {product.category}
        </Link></li>
        <li className="text-gray-400">›</li>
        <li className="text-gray-500 truncate max-w-[200px]">{product.name}</li>
        {selectedCombination && (
          <>
            <li className="text-gray-400">›</li>
            <li className="text-gray-500">{selectedCombination.variant?.variant_value?.name}</li>
          </>
        )}
      </ol>
    </nav>
  );

  // Responsive grid styles
  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '1rem' : '2rem',
    marginBottom: '4rem'
  };

  if (isLoading) return <Loader />;
  if (error || !product) return <div className="text-center p-8">Product not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb />
        
        {/* Main Product Section */}
        <div style={mainGridStyle}>
          <ProductImages 
            product={product} 
            selectedCombination={selectedCombination}
          />
          <div>
            <ProductInfo 
              product={product} 
              selectedCombination={selectedCombination}
              setSelectedCombination={handleCombinationSelect}
            />
            {/* Variant Images Gallery below Add to Cart */}
            <VariantImagesGallery 
              product={product}
              selectedCombination={selectedCombination}
              onCombinationSelect={handleCombinationSelect}
            />
          </div>
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
                onClick={() => setActiveTab('specifications')}
                className={`pb-4 px-1 font-semibold text-sm uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'specifications' 
                    ? 'border-yellow-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Specifications
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
                      {product.description && product.description.split('\n').map((paragraph, index) => (
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
                        <span className="font-semibold text-gray-700 text-sm">Stone</span>
                        <span className="text-gray-900 text-sm">{product.stone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700 text-sm">Brand</span>
                        <span className="text-gray-900 text-sm">{product.brand}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-700 text-sm">Category</span>
                        <span className="text-gray-900 text-sm">{product.category}</span>
                      </div>
                      {product.weight && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-semibold text-gray-700 text-sm">Weight</span>
                          <span className="text-gray-900 text-sm">{product.weight}g</span>
                        </div>
                      )}
                      {selectedCombination && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="font-semibold text-gray-700 text-sm">Variant</span>
                          <span className="text-gray-900 text-sm">{selectedCombination.variant?.variant_value?.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Related Products */}
                <RelatedProducts relatedProducts={product.relatedProducts} />
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
                  Specifications
                </h3>
                <ul className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Related Products in Specifications tab too */}
                <RelatedProducts relatedProducts={product.relatedProducts} />
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-12">
                <ProductReviews product={product} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;