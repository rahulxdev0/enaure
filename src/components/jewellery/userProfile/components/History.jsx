


import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockHistory = [
    { 
      id: 1, 
      name: 'Diamond Solitaire Ring', 
      price: '$1,299.00', 
      type: 'purchased', 
      date: '2024-01-15',
      category: 'Rings',
      image: '/images/ring-solitaire.jpg'
    },
    { 
      id: 2, 
      name: 'Pearl Drop Earrings', 
      price: '$450.00', 
      type: 'viewed', 
      date: '2024-01-14',
      category: 'Earrings',
      image: '/images/earrings-pearl.jpg'
    },
    { 
      id: 3, 
      name: 'Gold Chain Bracelet', 
      price: '$320.00', 
      type: 'purchased', 
      date: '2024-01-10',
      category: 'Bracelets',
      image: '/images/bracelet-gold.jpg'
    },
    { 
      id: 4, 
      name: 'Sapphire Pendant', 
      price: '$780.00', 
      type: 'viewed', 
      date: '2024-01-08',
      category: 'Pendants',
      image: '/images/pendant-sapphire.jpg'
    },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setHistory(mockHistory);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const styles = {
    historyContainer: {
      background: 'linear-gradient(135deg, #fefefe 0%, #fafafa 100%)',
      minHeight: '500px',
      padding: '30px',
      borderRadius: '0'
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: '300',
      color: '#333',
      marginBottom: '30px',
      fontFamily: '"Playfair Display", serif',
      letterSpacing: '1px',
      borderBottom: '2px solid #b8860b',
      paddingBottom: '10px',
      display: 'inline-block'
    },
    historyItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #e8e8e8',
      marginBottom: '15px',
      background: 'white',
      gap: '20px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    historyItemHover: {
      transform: 'translateX(5px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    productImage: {
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      border: '1px solid #f0f0f0'
    },
    itemDetails: {
      flex: 1
    },
    itemName: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#333',
      marginBottom: '5px',
      fontFamily: '"Playfair Display", serif'
    },
    itemCategory: {
      fontSize: '12px',
      color: '#999',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '8px'
    },
    itemPrice: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#b8860b'
    },
    itemType: {
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '500',
      marginRight: '15px'
    },
    purchasedType: {
      background: '#f0f8f0',
      color: '#2e7d32',
      border: '1px solid #2e7d32'
    },
    viewedType: {
      background: '#fffaf0',
      color: '#b8860b',
      border: '1px solid #b8860b'
    },
    itemDate: {
      color: '#666',
      fontSize: '13px',
      fontStyle: 'italic'
    },
    typeDateContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '10px'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px'
    },
    spinner: {
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #b8860b',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      marginTop: '20px',
      color: '#666',
      fontSize: '16px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#666'
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '20px',
      color: '#ddd'
    }
  };

  const getTypeStyle = (type) => {
    return type === 'purchased' ? styles.purchasedType : styles.viewedType;
  };

  if (loading) {
    return (
      <div style={styles.historyContainer}>
        <h2 style={styles.pageTitle}>Your History</h2>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your jewellery journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.historyContainer}>
      <h2 style={styles.pageTitle}>Your History</h2>
      
      {history.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📜</div>
          <h3 style={{marginBottom: '10px', color: '#333'}}>No History Yet</h3>
          <p>Your jewellery browsing and purchase history will appear here</p>
        </div>
      ) : (
        history.map(item => (
          <div 
            key={item.id} 
            style={styles.historyItem}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.historyItemHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.historyItem)}
          >
            <img 
              src={item.image} 
              alt={item.name}
              style={styles.productImage}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAzMEMzMi4wOTEgMzAgMzQgMjguMDkxIDM0IDI2QzM0IDIzLjkwOSAzMi4wOTEgMjIgMzAgMjJDMjcuOTA5IDIyIDI2IDIzLjkwOSAyNiAyNkMyNiAyOC4wOTEgMjcuOTA5IDMwIDMwIDMwWiIgZmlsbD0iI0M4OEM4YyIvPgo8cGF0aCBkPSJNMzAgMzdDMzIuODIgMzcgMzUgMzQuODIgMzUgMzJDMzUgMjkuMTggMzIuODIgMjcgMzAgMjdDMjcuMTggMjcgMjUgMjkuMTggMjUgMzJDMjUgMzQuODIgMjcuMTggMzcgMzAgMzdaIiBmaWxsPSIjQzg4QzhjIi8+Cjwvc3ZnPgo=';
              }}
            />
            <div style={styles.itemDetails}>
              <h4 style={styles.itemName}>{item.name}</h4>
              <div style={styles.itemCategory}>{item.category}</div>
              <div style={styles.itemPrice}>{item.price}</div>
              <div style={styles.typeDateContainer}>
                <span style={{
                  ...styles.itemType,
                  ...getTypeStyle(item.type)
                }}>
                  {item.type === 'purchased' ? 'Purchased' : 'Viewed'}
                </span>
                <span style={styles.itemDate}>
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;