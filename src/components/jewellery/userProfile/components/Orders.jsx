import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockOrders = [
    { 
      id: 1, 
      name: 'Eternal Diamond Ring', 
      price: '$1,299.00', 
      salePrice: '$1,099.00', 
      status: 'Delivered', 
      orderDate: '2024-01-15',
      orderNumber: 'GIVA-1001',
      image: '/images/ring-diamond.jpg',
      category: 'Rings'
    },
    { 
      id: 2, 
      name: 'Pearl & Gold Necklace', 
      price: '$899.00', 
      status: 'Processing', 
      orderDate: '2024-01-10',
      orderNumber: 'GIVA-1002',
      image: '/images/necklace-pearl.jpg',
      category: 'Necklaces'
    },
    { 
      id: 3, 
      name: 'Silver Infinity Bracelet', 
      price: '$499.00', 
      status: 'Shipped', 
      orderDate: '2024-01-05',
      orderNumber: 'GIVA-1003',
      image: '/images/bracelet-silver.jpg',
      category: 'Bracelets'
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const styles = {
    ordersContainer: {
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
    orderCard: {
      background: 'white',
      border: '1px solid #e8e8e8',
      marginBottom: '20px',
      padding: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    },
    orderCardHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    productImage: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      border: '1px solid #f0f0f0'
    },
    orderDetails: {
      flex: 1
    },
    orderName: {
      fontSize: '18px',
      fontWeight: '400',
      color: '#333',
      marginBottom: '8px',
      fontFamily: '"Playfair Display", serif'
    },
    orderNumber: {
      fontSize: '12px',
      color: '#999',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '10px'
    },
    priceContainer: {
      marginBottom: '15px'
    },
    originalPrice: {
      textDecoration: 'line-through',
      color: '#999',
      marginRight: '15px',
      fontSize: '14px'
    },
    salePrice: {
      color: '#b8860b',
      fontWeight: '600',
      fontSize: '18px'
    },
    regularPrice: {
      color: '#333',
      fontWeight: '600',
      fontSize: '18px'
    },
    orderFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    orderStatus: {
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '500'
    },
    statusDelivered: {
      background: '#e8f5e8',
      color: '#2e7d32'
    },
    statusProcessing: {
      background: '#fff3e0',
      color: '#ef6c00'
    },
    statusShipped: {
      background: '#e3f2fd',
      color: '#1565c0'
    },
    orderDate: {
      color: '#666',
      fontSize: '14px',
      fontStyle: 'italic'
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

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return styles.statusDelivered;
      case 'processing':
        return styles.statusProcessing;
      case 'shipped':
        return styles.statusShipped;
      default:
        return styles.statusProcessing;
    }
  };

  if (loading) {
    return (
      <div style={styles.ordersContainer}>
        <h2 style={styles.pageTitle}>Your Orders</h2>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your precious orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.ordersContainer}>
      <h2 style={styles.pageTitle}>Your Orders</h2>
      
      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>💎</div>
          <h3 style={{marginBottom: '10px', color: '#333'}}>No Orders Yet</h3>
          <p>Start your jewellery collection with our exquisite pieces</p>
        </div>
      ) : (
        orders.map(order => (
          <div 
            key={order.id} 
            style={styles.orderCard}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.orderCardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.orderCard)}
          >
            <img 
              src={order.image} 
              alt={order.name}
              style={styles.productImage}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik00MCA0MEM0Mi4yMDkxIDQwIDQ0IDM4LjIwOTEgNDQgMzZDNDQgMzMuNzkwOSA0Mi4yMDkxIDMyIDQwIDMyQzM3Ljc5MDkgMzIgMzYgMzMuNzkwOSAzNiAzNkMzNiAzOC4yMDkxIDM3Ljc5MDkgNDAgNDAgNDBaIiBmaWxsPSIjQzg4QzhjIi8+CjxwYXRoIGQ9Ik00MCA1MEM0My44NjYgNTAgNDcgNDYuODY2IDQ3IDQzQzQ3IDM5LjEzNCA0My44NjYgMzYgNDAgMzZDMzYuMTM0IDM2IDMzIDM5LjEzNCAzMyA0M0MzMyA0Ni44NjYgMzYuMTN0IDUwIDQwIDUwWiIgZmlsbD0iI0M4OEM4YyIvPgo8L3N2Zz4K';
              }}
            />
            <div style={styles.orderDetails}>
              <h4 style={styles.orderName}>{order.name}</h4>
              <div style={styles.orderNumber}>{order.orderNumber}</div>
              <div style={styles.priceContainer}>
                {order.salePrice ? (
                  <>
                    <span style={styles.originalPrice}>{order.price}</span>
                    <span style={styles.salePrice}>{order.salePrice}</span>
                  </>
                ) : (
                  <span style={styles.regularPrice}>{order.price}</span>
                )}
              </div>
              <div style={styles.orderFooter}>
                <span style={{
                  ...styles.orderStatus,
                  ...getStatusStyle(order.status)
                }}>
                  {order.status}
                </span>
                <span style={styles.orderDate}>
                  Ordered: {new Date(order.orderDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
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

export default Orders;