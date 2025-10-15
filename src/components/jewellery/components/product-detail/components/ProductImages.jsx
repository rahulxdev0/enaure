//src/components/jewellery/components/product-detail/components/ProductImages.jsx
import React, { useState } from 'react';

const ProductImages = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const productImages = [
    product.images?.[0] || '/images/ring-main.png',
    '/images/ring-angle-1.jpg',
    '/images/ring-angle-2.jpg',
    '/images/ring-packaging.jpg'
  ];

  return (
    <div className="product-images" style={{ 
      flex: '1 1 45%', 
      minWidth: '400px', 
      maxWidth: '500px',
      marginBottom: '40px',
      position: 'relative'
    }}>
      {/* SALE Badge */}
      <span style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        backgroundColor: '#d4af37',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '2px',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 10,
        textTransform: 'uppercase'
      }} className="sale-badge">
        SALE
      </span>

      {/* Main Image */}
      <div style={{ 
        backgroundColor: '#f8f8f8',
        border: '1px solid #e0e0e0', 
        borderRadius: '4px', 
        padding: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '450px',
        marginBottom: '20px',
        position: 'relative'
      }} className="main-image-container">
        <img 
          src={productImages[selectedImage]} 
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          className="main-image"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        justifyContent: 'center',
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '10px'
      }} className="thumbnail-gallery">
        {productImages.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            style={{
              width: '70px',
              height: '70px',
              border: selectedImage === index ? '2px solid #d4af37' : '1px solid #ddd',
              borderRadius: '4px',
              padding: '3px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            className="thumbnail-item"
          >
            <img 
              src={image} 
              alt={`${product.name} view ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }}
            />
          </div>
        ))}
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .product-images {
            min-width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 20px !important;
          }
          
          .main-image-container {
            height: 300px !important;
            padding: 20px !important;
            margin-bottom: 15px !important;
          }
          
          .thumbnail-gallery {
            gap: 8px !important;
            justify-content: flex-start !important;
          }
          
          .thumbnail-item {
            width: 60px !important;
            height: 60px !important;
          }
          
          .sale-badge {
            top: 10px !important;
            left: 10px !important;
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
        }
        
        @media (max-width: 480px) {
          .main-image-container {
            height: 250px !important;
            padding: 15px !important;
          }
          
          .thumbnail-item {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductImages; 