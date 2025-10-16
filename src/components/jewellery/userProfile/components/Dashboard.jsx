import React from 'react';

const Dashboard = () => {
  const styles = {
    dashboard: {
      background: 'linear-gradient(135deg, #fefefe 0%, #fafafa 100%)',
      minHeight: '400px',
      padding: '30px',
      borderRadius: '0'
    },
    welcomeSection: {
      textAlign: 'center',
      marginBottom: '40px',
      padding: '30px',
      background: 'white',
      border: '1px solid #e8e8e8',
      borderRadius: '0'
    },
    welcomeTitle: {
      fontSize: '28px',
      fontWeight: '300',
      color: '#333',
      marginBottom: '15px',
      fontFamily: '"Playfair Display", serif',
      letterSpacing: '1px'
    },
    welcomeText: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    statCard: {
      background: 'white',
      padding: '25px',
      border: '1px solid #e8e8e8',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    },
    statCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: '300',
      color: '#b8860b',
      marginBottom: '8px',
      fontFamily: '"Playfair Display", serif'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    quickActions: {
      background: 'white',
      padding: '30px',
      border: '1px solid #e8e8e8'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '400',
      color: '#333',
      marginBottom: '20px',
      fontFamily: '"Playfair Display", serif',
      borderBottom: '2px solid #b8860b',
      paddingBottom: '10px',
      display: 'inline-block'
    },
    actionButtons: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap'
    },
    actionButton: {
      padding: '12px 24px',
      border: '1px solid #b8860b',
      background: 'transparent',
      color: '#b8860b',
      cursor: 'pointer',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.3s ease'
    },
    actionButtonHover: {
      background: '#b8860b',
      color: 'white'
    }
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.welcomeSection}>
        <h2 style={styles.welcomeTitle}>Welcome to Your Luxury Dashboard</h2>
        <p style={styles.welcomeText}>
          Discover your personalized jewellery journey. Track orders, manage your wishlist, 
          and explore exclusive collections crafted just for you.
        </p>
      </div>

      <div style={styles.statsGrid}>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.statCardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.statCard)}
        >
          <div style={styles.statNumber}>3</div>
          <div style={styles.statLabel}>Active Orders</div>
        </div>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.statCardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.statCard)}
        >
          <div style={styles.statNumber}>12</div>
          <div style={styles.statLabel}>Wishlist Items</div>
        </div>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.statCardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.statCard)}
        >
          <div style={styles.statNumber}>8</div>
          <div style={styles.statLabel}>Order History</div>
        </div>
        <div 
          style={styles.statCard}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.statCardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.statCard)}
        >
          <div style={styles.statNumber}>2</div>
          <div style={styles.statLabel}>Saved Addresses</div>
        </div>
      </div>

      <div style={styles.quickActions}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.actionButtons}>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.actionButtonHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.actionButton)}
          >
            Browse New Collection
          </button>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.actionButtonHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.actionButton)}
          >
            Track Your Order
          </button>
          <button 
            style={styles.actionButton}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.actionButtonHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.actionButton)}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;