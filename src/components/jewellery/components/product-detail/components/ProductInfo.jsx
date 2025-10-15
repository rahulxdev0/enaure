
// src/components/jewellery/components/product-detail/components/ProductInfo.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMobileCheck from "../../../../../hooks/useMobileCheck";

const ProductInfo = ({ product, selectedCombination, setSelectedCombination }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const isMobile = useMobileCheck();

  const handleCombinationSelect = (combination) => {
    setSelectedCombination(combination);
  };

  const handleAddToCart = () => {
    const productToAdd = selectedCombination 
      ? { 
          ...product, 
          ...selectedCombination, 
          quantity,
          finalPrice: selectedCombination.discounted_price || selectedCombination.price
        }
      : { ...product, quantity };
    
    console.log('Added to cart:', productToAdd);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  // Get current price based on selection
  const getCurrentPrice = () => {
    return selectedCombination 
      ? (selectedCombination.discounted_price || selectedCombination.price)
      : product.price;
  };

  const getOriginalPrice = () => {
    return selectedCombination 
      ? selectedCombination.price
      : product.originalPrice;
  };

  // Star Rating Component
  const StarRating = ({ rating, reviewCount }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} className="star-rating">
      <div style={{ color: '#ffd700', fontSize: isMobile ? '16px' : '18px', marginRight: '10px' }} className="stars">
        {'★'.repeat(rating)}
      </div>
      <span style={{ fontSize: isMobile ? '13px' : '14px', color: '#666' }} className="review-count">
        ({reviewCount} customer review)
      </span>
    </div>
  );

  // Responsive styles
  const containerStyle = {
    flex: isMobile ? '1 1 100%' : '1 1 45%',
    minWidth: isMobile ? '100%' : '400px',
    maxWidth: isMobile ? '100%' : '500px'
  };

  const titleStyle = {
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: 'normal',
    color: '#333',
    margin: '0 0 10px 0',
    lineHeight: '1.3'
  };

  const metaStyle = {
    fontSize: isMobile ? '13px' : '14px',
    color: '#666',
    marginBottom: isMobile ? '12px' : '15px'
  };

  const priceSectionStyle = {
    marginBottom: isMobile ? '20px' : '25px',
    paddingBottom: isMobile ? '20px' : '25px',
    borderBottom: '1px solid #eee'
  };

  const originalPriceStyle = {
    fontSize: isMobile ? '16px' : '18px',
    color: '#999',
    textDecoration: 'line-through',
    marginRight: '15px'
  };

  const currentPriceStyle = {
    fontSize: isMobile ? '24px' : '28px',
    color: '#2a9d8f',
    fontWeight: 'bold'
  };

  const stockStyle = {
    fontSize: isMobile ? '14px' : '15px',
    color: (selectedCombination?.stock_status || product.stockStatus) === 'in_stock' ? '#22c55e' : '#ef4444',
    fontWeight: 'bold',
    marginBottom: '15px'
  };

  const actionButtonsStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: isMobile ? '20px' : '25px',
    flexDirection: isMobile ? 'column' : 'row'
  };

  const baseButtonStyle = {
    padding: isMobile ? '12px 20px' : '15px 30px',
    borderRadius: '4px',
    fontSize: isMobile ? '15px' : '16px',
    fontWeight: 'bold',
    flex: '1',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none'
  };

  const isInStock = (selectedCombination?.stock_status || product.stockStatus) === 'in_stock';

  const addToCartButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: isInStock ? '#f4f4f4' : '#f0f0f0',
    color: isInStock ? '#333' : '#999',
    border: '1px solid #ddd',
    cursor: isInStock ? 'pointer' : 'not-allowed'
  };

  const buyNowButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: isInStock ? '#ca8a04' : '#d1d5db',
    color: 'white',
    cursor: isInStock ? 'pointer' : 'not-allowed'
  };

  return (
    <div className="product-info" style={containerStyle}>
      {/* Product Title */}
      <h1 style={titleStyle} className="product-title">
        {product.name}
      </h1>
      
      {/* Star Rating */}
      <StarRating rating={product.rating} reviewCount={product.reviewCount} />

      {/* SKU and Category */}
      <div style={metaStyle} className="product-meta">
        <strong>SKU:</strong> {selectedCombination?.sku || product.sku} 
        <strong style={{ marginLeft: '15px' }}>Category:</strong> {product.category}
      </div>

      {/* Selected Variant */}
      {selectedCombination && (
        <div style={{ 
          backgroundColor: '#f0f8ff', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          <strong>Selected: </strong>
          {selectedCombination.variant?.name}: {selectedCombination.variant?.variant_value?.name}
        </div>
      )}

      {/* Stock Status */}
      <div style={stockStyle} className="stock-status">
        {isInStock ? 'In Stock' : 'Out of Stock'}
        {(selectedCombination?.stock_quantity || product.stockQuantity) > 0 && ` (${selectedCombination?.stock_quantity || product.stockQuantity} available)`}
      </div>

      {/* Price */}
      <div style={priceSectionStyle} className="price-section">
        {getOriginalPrice() > getCurrentPrice() && (
          <span style={originalPriceStyle} className="original-price">
            ${getOriginalPrice()}
          </span>
        )}
        <span style={currentPriceStyle} className="current-price">
          ${getCurrentPrice()}
        </span>
      </div>

      {/* Variant Selection */}
      {product.availableCombinations && product.availableCombinations.length > 0 && (
        <div style={{ marginBottom: '20px' }} className="variant-selection">
          <h3 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>
            Available Options:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {product.availableCombinations.map((combination, index) => (
              <button
                key={combination.combination_id}
                onClick={() => handleCombinationSelect(combination)}
                style={{
                  padding: '8px 16px',
                  border: selectedCombination?.combination_id === combination.combination_id 
                    ? '2px solid #d4af37' 
                    : '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: selectedCombination?.combination_id === combination.combination_id 
                    ? '#fefce8' 
                    : '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  opacity: combination.stock_status === 'out_of_stock' ? 0.6 : 1
                }}
                disabled={combination.stock_status === 'out_of_stock'}
              >
                {combination.variant?.variant_value?.name} - ${combination.discounted_price}
                {combination.stock_status === 'out_of_stock' && ' (Out of Stock)'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div style={{ marginBottom: '20px' }} className="quantity-selector">
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Quantity:</label>
        <input
          type="number"
          min="1"
          max={selectedCombination?.stock_quantity || product.stockQuantity}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={{
            width: '80px',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textAlign: 'center'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="action-buttons" style={actionButtonsStyle}>
        <button 
          onClick={handleAddToCart}
          style={addToCartButtonStyle}
          className="add-to-cart-btn"
          disabled={!isInStock}
          onMouseOver={(e) => {
            if (isInStock) {
              e.target.style.backgroundColor = '#e9e9e9';
            }
          }}
          onMouseOut={(e) => {
            if (isInStock) {
              e.target.style.backgroundColor = '#f4f4f4';
            }
          }}
        >
          <span style={{ marginRight: '8px' }}>🛒</span>
          {isInStock ? 'Add to cart' : 'Out of Stock'}
        </button>
        <button 
          onClick={handleBuyNow}
          style={buyNowButtonStyle}
          className="buy-now-btn"
          disabled={!isInStock}
          onMouseOver={(e) => {
            if (isInStock) {
              e.target.style.backgroundColor = '#b8942f';
            }
          }}
          onMouseOut={(e) => {
            if (isInStock) {
              e.target.style.backgroundColor = '#ca8a04';
            }
          }}
        >
          <span style={{ marginRight: '8px' }}>⚡</span>
          Buy now
        </button>
      </div>

      {/* Additional Actions */}
      <div className="additional-actions" style={{ marginBottom: '25px' }}>
        <button 
          onClick={toggleWishlist}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#666', 
            fontSize: isMobile ? '13px' : '14px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center' 
          }}
          className="wishlist-btn"
        >
          <span style={{ marginRight: '8px', fontSize: '18px' }} className="wishlist-icon">
            {isInWishlist ? '♥' : '♡'}
          </span>
          {isInWishlist ? 'In wishlist' : 'Add to wishlist'}
        </button>
      </div>

      {/* Short Description */}
      {product.shortDescription && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {product.shortDescription}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;