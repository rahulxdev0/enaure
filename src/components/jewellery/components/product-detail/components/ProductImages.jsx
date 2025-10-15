
// src/components/jewellery/components/product-detail/components/ProductImages.jsx
import React, { useState, useEffect } from 'react';
import useMobileCheck from "../../../../../hooks/useMobileCheck";

const ProductImages = ({ product, selectedCombination }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [displayImages, setDisplayImages] = useState([]);
  const isMobile = useMobileCheck();

  // Effect to update images when product or combination changes
  useEffect(() => {
    let imagesToDisplay = [];

    if (selectedCombination) {
      // Show combination-specific images first
      const combinationImages = product.images?.filter(img => 
        img.alt_text?.includes(selectedCombination.variant?.variant_value?.name) ||
        img.alt_text?.includes('Carat Weight')
      ) || [];

      // Add combination primary image
      if (selectedCombination.primary_image) {
        imagesToDisplay.push({
          id: `combo-${selectedCombination.combination_id}`,
          image_url: selectedCombination.primary_image,
          alt_text: `${product.name} - ${selectedCombination.variant?.variant_value?.name}`
        });
      }

      // Combine all images
      imagesToDisplay = [...imagesToDisplay, ...combinationImages];
      
      // Add remaining images
      const otherImages = product.images?.filter(img => 
        !combinationImages.includes(img) && 
        img.image_url !== selectedCombination.primary_image
      ) || [];
      
      imagesToDisplay = [...imagesToDisplay, ...otherImages];
    } else {
      // Show all product images
      imagesToDisplay = product.images || [];
    }

    // Fallback
    if (imagesToDisplay.length === 0) {
      imagesToDisplay = [{ 
        id: 'placeholder', 
        image_url: '/images/placeholder.jpg',
        alt_text: product.name 
      }];
    }

    setDisplayImages(imagesToDisplay);
    setSelectedImage(0);
  }, [product, selectedCombination]);

  // Responsive styles (same as before)
  const containerStyle = {
    flex: isMobile ? '1 1 100%' : '1 1 45%',
    minWidth: isMobile ? '100%' : '400px',
    maxWidth: isMobile ? '100%' : '500px',
    marginBottom: isMobile ? '20px' : '40px',
    position: 'relative'
  };

  const mainImageContainerStyle = {
    backgroundColor: '#f8f8f8',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: isMobile ? '20px' : '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: isMobile ? '300px' : '450px',
    marginBottom: isMobile ? '15px' : '20px',
    position: 'relative'
  };

  const saleBadgeStyle = {
    position: 'absolute',
    top: isMobile ? '10px' : '15px',
    left: isMobile ? '10px' : '15px',
    backgroundColor: '#d4af37',
    color: 'white',
    padding: isMobile ? '6px 10px' : '8px 12px',
    borderRadius: '2px',
    fontSize: isMobile ? '11px' : '12px',
    fontWeight: 'bold',
    zIndex: 10,
    textTransform: 'uppercase'
  };

  const thumbnailGalleryStyle = {
    display: 'flex',
    gap: isMobile ? '8px' : '12px',
    justifyContent: isMobile ? 'flex-start' : 'center',
    marginBottom: '20px',
    overflowX: 'auto',
    paddingBottom: '10px'
  };

  const thumbnailSize = isMobile ? '60px' : '70px';

  return (
    <div className="product-images" style={containerStyle}>
      {/* SALE Badge */}
      {product.price < product.originalPrice && (
        <span style={saleBadgeStyle} className="sale-badge">
          SALE
        </span>
      )}

      {/* Main Image */}
      <div style={mainImageContainerStyle} className="main-image-container">
        {displayImages[selectedImage] && (
          <img 
            src={displayImages[selectedImage].image_url} 
            alt={displayImages[selectedImage].alt_text || product.name}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            className="main-image"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        )}
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div style={thumbnailGalleryStyle} className="thumbnail-gallery">
          {displayImages.map((image, index) => (
            <div
              key={image.id || index}
              onClick={() => setSelectedImage(index)}
              style={{
                width: thumbnailSize,
                height: thumbnailSize,
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
                src={image.image_url} 
                alt={image.alt_text || `${product.name} view ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;