//src/components/jewellery/components/product-detail/components/ProductInfo.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToCart = () => {
    console.log('Added to cart:', { ...product, quantity, size: selectedSize });
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  // Star Rating Component
  const StarRating = ({ rating, reviewCount }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} className="star-rating">
      <div style={{ color: '#ffd700', fontSize: '18px', marginRight: '10px' }} className="stars">
        {'★'.repeat(rating)}
      </div>
      <span style={{ fontSize: '14px', color: '#666' }} className="review-count">({reviewCount} customer review)</span>
    </div>
  );

  return (
    <div className="product-info" style={{ 
      flex: '1 1 45%', 
      minWidth: '400px', 
      maxWidth: '500px' 
    }}>
      {/* Product Title */}
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: 'normal', 
        color: '#333', 
        margin: '0 0 10px 0',
        lineHeight: '1.3'
      }} className="product-title">
        {product.name}
      </h1>
      
      {/* Star Rating */}
      <StarRating rating={product.rating} reviewCount={product.reviewCount} />

      {/* SKU and Category */}
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }} className="product-meta">
        <strong>SKU:</strong> {product.sku} <strong style={{ marginLeft: '15px' }}>Category:</strong> Rings
      </div>

      {/* Price */}
      <div style={{ 
        marginBottom: '25px', 
        paddingBottom: '25px', 
        borderBottom: '1px solid #eee'
      }} className="price-section">
        <span style={{ 
          fontSize: '18px', 
          color: '#999', 
          textDecoration: 'line-through', 
          marginRight: '15px' 
        }} className="original-price">
          ${product.originalPrice}
        </span>
        <span style={{ 
          fontSize: '28px', 
          color: '#2a9d8f', 
          fontWeight: 'bold' 
        }} className="current-price">
          ${product.price}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons" style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '25px' 
      }}>
        <button 
          onClick={handleAddToCart}
          style={{
            backgroundColor: '#f4f4f4',
            color: '#333',
            border: '1px solid #ddd',
            padding: '15px 30px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            flex: '1',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          className="add-to-cart-btn"
          onMouseOver={(e) => e.target.style.backgroundColor = '#e9e9e9'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f4f4f4'}
        >
          <span style={{ marginRight: '8px' }}>🛒</span>
          Add to cart
        </button>
        <button 
          onClick={handleBuyNow}
          style={{
            backgroundColor: '#ca8a04',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            flex: '1',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          className="buy-now-btn"
          onMouseOver={(e) => e.target.style.backgroundColor = '#b8942f'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#d4af37'}
        >
          <span style={{ marginRight: '8px' }}>🛒</span>
          Buy now
        </button>
      </div>

      {/* Additional Actions */}
      <div className="additional-actions" style={{ 
        display: 'flex', 
        gap: '25px', 
        marginBottom: '30px' 
      }}>
        <button 
          onClick={toggleWishlist}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#666', 
            fontSize: '14px', 
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

      {/* Social Icons */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px' 
      }} className="social-icons">
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>f</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>×</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>℗</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>in</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>⌁</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>Ⓜ</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>⚐</button>
        <button style={{ background: 'none', border: 'none', fontSize: '18px', color: '#666', cursor: 'pointer' }}>✈</button>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .product-info {
            min-width: 100% !important;
            max-width: 100% !important;
          }
          
          .product-title {
            font-size: 20px !important;
            margin-bottom: 8px !important;
          }
          
          .star-rating .stars {
            font-size: 16px !important;
          }
          
          .review-count {
            font-size: 13px !important;
          }
          
          .product-meta {
            font-size: 13px !important;
            margin-bottom: 12px !important;
          }
          
          .price-section {
            margin-bottom: 20px !important;
            padding-bottom: 20px !important;
          }
          
          .original-price {
            font-size: 16px !important;
          }
          
          .current-price {
            font-size: 24px !important;
          }
          
          .action-buttons {
            flex-direction: column;
            gap: 12px !important;
            margin-bottom: 20px !important;
          }
          
          .add-to-cart-btn,
          .buy-now-btn {
            padding: 12px 20px !important;
            font-size: 15px !important;
          }
          
          .additional-actions {
            gap: 20px !important;
            margin-bottom: 25px !important;
            justify-content: center;
          }
          
          .wishlist-btn {
            font-size: 13px !important;
          }
          
          .social-icons {
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px !important;
            margin-bottom: 25px !important;
          }
        }
        
        @media (max-width: 480px) {
          .product-title {
            font-size: 18px !important;
          }
          
          .current-price {
            font-size: 22px !important;
          }
          
          .add-to-cart-btn,
          .buy-now-btn {
            padding: 10px 15px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductInfo;