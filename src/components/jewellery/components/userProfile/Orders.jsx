import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockOrders = [
    { id: 1, name: 'Order #1001', price: '$29.99', salePrice: '$24.99', status: 'Delivered', orderDate: '2024-01-15' },
    { id: 2, name: 'Order #1002', price: '$49.99', status: 'Processing', orderDate: '2024-01-10' },
    { id: 3, name: 'Order #1003', price: '$19.99', status: 'Shipped', orderDate: '2024-01-05' },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await api.get('/orders');
        // setOrders(response.data);
        
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center -mt-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  const styles = {
    orderCard: {
      border: '1px solid #eee',
      padding: '20px',
      marginBottom: '15px',
      borderRadius: '8px'
    },
    orderStatus: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      background: '#e8f5e8',
      color: '#2ecc71',
      display: 'inline-block'
    },
    originalPrice: {
      textDecoration: 'line-through',
      color: '#999',
      marginRight: '10px'
    },
    salePrice: {
      color: '#e74c3c',
      fontWeight: 'bold'
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={styles.orderCard}>
            <div>
              <h4>{order.name}</h4>
              <div style={{ marginBottom: '10px' }}>
                {order.salePrice ? (
                  <>
                    <span style={styles.originalPrice}>{order.price}</span>
                    <span style={styles.salePrice}>{order.salePrice}</span>
                  </>
                ) : (
                  <span>{order.price}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.orderStatus}>{order.status}</span>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  Ordered on: {new Date(order.orderDate).toLocaleDateString()}
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