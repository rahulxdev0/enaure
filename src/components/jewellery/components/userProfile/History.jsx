import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockHistory = [
    { id: 1, name: 'Product A', price: '$29.99', type: 'purchased', date: '2024-01-15' },
    { id: 2, name: 'Product B', price: '$49.99', type: 'viewed', date: '2024-01-14' },
    { id: 3, name: 'Product C', price: '$19.99', type: 'purchased', date: '2024-01-10' },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await api.get('/history');
        // setHistory(response.data);
        
        setTimeout(() => {
          setHistory(mockHistory);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center -mt-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your history...</p>
        </div>
      </div>
    );
  }

  const styles = {
    historyItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      border: '1px solid #eee',
      marginBottom: '10px',
      borderRadius: '4px'
    },
    historyType: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      background: '#e3f2fd',
      color: '#1976d2'
    },
    purchaseType: {
      background: '#e8f5e8',
      color: '#2ecc71'
    },
    viewType: {
      background: '#fff3cd',
      color: '#856404'
    }
  };

  const getTypeStyle = (type) => {
    return type === 'purchased' ? styles.purchaseType : styles.viewType;
  };

  return (
    <div>
      <h2>History</h2>
      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map(item => (
          <div key={item.id} style={styles.historyItem}>
            <span style={{ flex: 2 }}>{item.name}</span>
            <span style={{ flex: 1, textAlign: 'center' }}>{item.price}</span>
            <span style={{
              ...styles.historyType,
              ...getTypeStyle(item.type)
            }}>
              {item.type === 'purchased' ? 'Purchased' : 'Viewed'}
            </span>
            <span style={{ color: '#666', fontSize: '14px' }}>
              {new Date(item.date).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default History;