import React, { useState } from 'react';
import useMobileCheck from "../../../../../hooks/useMobileCheck";


const ProductReviews = ({ product }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ 
    rating: 5, 
    comment: ''
  });
  const isMobile = useMobileCheck();

  const reviews = [
    {
      id: 1,
      userName: 'Enovathemes',
      date: 'March 21, 2024',
      rating: 5, 
      comment: "I'm in love with this ring! It's elegant and lightweight, perfect for both casual and formal occasions."
    }
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('New review submitted:', newReview);
    alert('Review submitted successfully!');
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const StarRatingDisplay = ({ rating, size = '16px' }) => (
    <div style={{ display: 'flex', alignItems: 'center' }} className="star-rating-display">
      <div style={{ color: '#ffd700', fontSize: size }} className="stars">
        {'★'.repeat(rating)}
      </div>
    </div>
  );

  const StarRatingInput = ({ rating, onRatingChange }) => (
    <div style={{ display: 'flex', gap: '5px', fontSize: '24px', justifyContent: isMobile ? 'center' : 'flex-start' }} className="star-rating-input">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: star <= rating ? '#ffd700' : '#ddd',
            fontSize: '24px',
            padding: '0',
            margin: '0'
          }}
          className="star-btn"
        >
          ★
        </button>
      ))}
    </div>
  );

  // Responsive styles
  const reviewsHeaderStyle = {
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: 'bold',
    marginBottom: isMobile ? '20px' : '30px',
    textTransform: 'uppercase',
    color: '#333',
    textAlign: isMobile ? 'center' : 'left'
  };

  const reviewsContentStyle = {
    display: 'flex',
    gap: isMobile ? '30px' : '60px',
    flexWrap: 'wrap',
    flexDirection: isMobile ? 'column' : 'row'
  };

  const reviewsSummaryStyle = {
    flex: isMobile ? '1 1 100%' : '1 1 300px'
  };

  const reviewsListStyle = {
    flex: isMobile ? '1 1 100%' : '2 1 500px'
  };

  const averageRatingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '10px' : '0',
    textAlign: isMobile ? 'center' : 'left'
  };

  const ratingBarStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: isMobile ? '13px' : '14px'
  };

  const writeReviewButtonStyle = {
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    padding: isMobile ? '10px 20px' : '12px 24px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: isMobile ? '100%' : 'auto'
  };

  const reviewHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    flexDirection: isMobile ? 'column' : 'row',
    // alignItems: isMobile ? 'start' : 'center',
    gap: isMobile ? '8px' : '0'
  };

  const submitReviewButtonStyle = {
    backgroundColor: '#d4af37',
    color: 'white',
    border: 'none',
    padding: isMobile ? '10px 20px' : '12px 30px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: isMobile ? '100%' : 'auto'
  };

  return (
    <div className="product-reviews">
      {/* Reviews Header */}
      <h2 style={reviewsHeaderStyle} className="reviews-header">
        CUSTOMER REVIEWS
      </h2>

      <div style={reviewsContentStyle} className="reviews-content">
        
        {/* Left Column: Reviews Summary */}
        <div style={reviewsSummaryStyle} className="reviews-summary">
          {/* Average Rating */}
          <div style={averageRatingStyle} className="average-rating">
            <StarRatingDisplay rating={product.rating} size={isMobile ? '18px' : '20px'}/>
            <span style={{ fontSize: '14px', color: '#666', marginLeft: isMobile ? '0' : '10px' }} className="review-count">
              ({product.reviewCount} customer review)
            </span>
          </div>
          
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '25px', textAlign: isMobile ? 'center' : 'left' }} className="rating-text">
            5 out of 5 Stars
          </div>

          {/* Rating Breakdown */}
          <div style={{ marginBottom: '30px' }} className="rating-breakdown">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} style={ratingBarStyle} className="rating-bar">
                <span style={{ width: isMobile ? '60px' : '70px', color: '#666' }} className="stars-label">{stars} Stars</span>
                <div style={{ 
                  flex: 1, 
                  backgroundColor: '#f0f0f0', 
                  height: '8px', 
                  borderRadius: '4px',
                  overflow: 'hidden',
                  margin: isMobile ? '0 10px' : '0 15px'
                }} className="rating-bar-bg">
                  <div 
                    style={{ 
                      backgroundColor: '#ffd700', 
                      height: '100%',
                      width: stars === 5 ? '100%' : '0%'
                    }} 
                    className="rating-bar-fill"
                  />
                </div>
                <span style={{ width: '20px', textAlign: 'right', color: '#666' }} className="rating-count">
                  {stars === 5 ? '1' : '0'}
                </span>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <button 
            onClick={() => setShowReviewForm(true)}
            style={writeReviewButtonStyle}
            className="write-review-btn"
          >
            Write a review
          </button>
        </div>

        {/* Right Column: Reviews and Form */}
        <div style={reviewsListStyle} className="reviews-list">
          {/* Existing Review */}
          <div style={{ marginBottom: '40px' }} className="existing-reviews">
            <h3 style={{ 
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
              textAlign: isMobile ? 'center' : 'left'
            }} className="reviews-title">
              1 REVIEW FOR {product.name}
            </h3>
            
            {reviews.map((review) => (
              <div key={review.id} style={{ 
                marginBottom: '25px', 
                paddingBottom: '25px', 
                borderBottom: '1px solid #eee' 
              }} className="review-item">
                <div style={reviewHeaderStyle} className="review-header">
                  <StarRatingDisplay rating={review.rating} />
                  <strong style={{ marginLeft: isMobile ? '0' : '15px', marginRight: isMobile ? '0' : '15px', fontSize: '14px' }} className="reviewer-name">
                    {review.userName}
                  </strong>
                  <span style={{ color: '#666', fontSize: '14px' }} className="review-date">{review.date}</span>
                </div>
                <p style={{ 
                  color: '#555', 
                  lineHeight: '1.6', 
                  margin: 0,
                  fontSize: isMobile ? '13px' : '14px'
                }} className="review-comment">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="add-review">
              <h3 style={{ 
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#333',
                textAlign: isMobile ? 'center' : 'left'
              }} className="add-review-title">
                ADD A REVIEW
              </h3>
              
              <form onSubmit={handleSubmitReview} className="review-form">
                <div style={{ marginBottom: '20px' }} className="rating-input-section">
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: '#333',
                    textAlign: isMobile ? 'center' : 'left'
                  }} className="rating-label">
                    Your rating *
                  </label>
                  <StarRatingInput 
                    rating={newReview.rating}
                    onRatingChange={(rating) => setNewReview({...newReview, rating})}
                  />
                </div>

                <div style={{ marginBottom: '25px' }} className="comment-input-section">
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: '#333',
                    textAlign: isMobile ? 'center' : 'left'
                  }} className="comment-label">
                    Your review *
                  </label>
                  <textarea 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '15px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      minHeight: '120px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Share your experience with this product..."
                    required
                    className="comment-textarea"
                  />
                </div>
                
                <button 
                  type="submit"
                  style={submitReviewButtonStyle}
                  className="submit-review-btn"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;