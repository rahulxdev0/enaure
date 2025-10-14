import React from 'react';

const PromotionalBanner = ({ 
  image, 
  subheading, 
  heading, 
  description, 
  link, 
  delay, 
  imageFirst = true,
  mobileImageFirst = true 
}) => {
  const animationStyle = {
    animationDelay: `${delay}ms`
  };

  const sectionClass = `promotional-banner-section ${imageFirst ? 'desktop-image-first' : 'desktop-text-first'} ${mobileImageFirst ? 'mobile-image-first' : 'mobile-text-first'}`;

  return (
    <div className={sectionClass} style={animationStyle}>
      {/* Desktop layout */}
      {imageFirst ? (
        <>
          <div 
            className="promotional-banner-image-bg" 
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="promotional-banner-content">
            <p className="promotional-banner-subheading"><span>{subheading}</span></p>
            <h3 className="promotional-banner-main-heading"><span>{heading}</span></h3>
            <p className="promotional-banner-description"><span>{description}</span></p>
            <a href={link} className="promotional-discover-button">
              <span className="promotional-button-text">Discover more</span>
              <span className="promotional-button-back"></span>
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="promotional-banner-content">
            <p className="promotional-banner-subheading"><span>{subheading}</span></p>
            <h3 className="promotional-banner-main-heading"><span>{heading}</span></h3>
            <p className="promotional-banner-description"><span>{description}</span></p>
            <a href={link} className="promotional-discover-button">
              <span className="promotional-button-text">Discover more</span>
              <span className="promotional-button-back"></span>
            </a>
          </div>
          <div 
            className="promotional-banner-image-bg" 
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </>
      )}
    </div>
  );
};

export default PromotionalBanner;