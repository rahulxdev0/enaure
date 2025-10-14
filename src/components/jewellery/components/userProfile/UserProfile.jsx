import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Home as HomeIcon, ShoppingBag } from 'lucide-react';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Wishlist from './Wishlist';
import Addresses from './Addresses';
import AccountDetails from './AccountDetails';
import History from './History';
import useMobileCheck from '../../../../hooks/useMobileCheck';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMobileCheck();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleShopClick = () => {
    navigate('/products');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Tab headers configuration
  const tabHeaders = {
    dashboard: {
      title: 'Dashboard',
      description: 'Overview of your account activity',
    },
    orders: {
      title: 'Orders',
      description: 'Manage and track your orders',
    },
    history: {
      title: 'History',
      description: 'View your purchase history',
    },
    wishlist: {
      title: 'Wishlist',
      description: 'Your saved favorite items',
    },
    addresses: {
      title: 'Addresses',
      description: 'Manage your shipping addresses',
    },
    account: {
      title: 'Account Details',
      description: 'Manage your profile and security settings',
    }
  };

  const styles = {
    userProfile: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '15px' : '20px',
      fontFamily: 'Arial, sans-serif'
    },
    breadcrumb: {
      fontSize: isMobile ? '12px' : '14px',
      color: '#666',
      marginBottom: isMobile ? '15px' : '20px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: isMobile ? '4px' : '8px'
    },
    breadcrumbLink: {
      color: '#f59e0b',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    breadcrumbSeparator: {
      color: '#999',
      margin: '0 4px'
    },
    breadcrumbCurrent: {
      color: '#666'
    },
    accountLayout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '250px 1fr',
      gap: isMobile ? '20px' : '40px'
    },
    accountSidebar: {
      background: '#f8f8f8',
      padding: isMobile ? '15px' : '20px',
      borderRadius: isMobile ? '0' : '0', // Removed rounded corners
      position: isMobile ? 'fixed' : 'static',
      top: isMobile ? '0' : 'auto',
      left: isMobile ? '0' : 'auto',
      right: isMobile ? '0' : 'auto',
      bottom: isMobile ? '0' : 'auto',
      zIndex: isMobile ? '1000' : 'auto',
      transform: isMobile ? (mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
      transition: isMobile ? 'transform 0.3s ease' : 'none',
      width: isMobile ? '280px' : 'auto',
      overflowY: isMobile ? 'auto' : 'visible'
    },
    sidebarList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },
    sidebarItem: {
      marginBottom: isMobile ? '8px' : '10px'
    },
    sidebarButton: {
      width: '100%',
      padding: isMobile ? '10px 12px' : '12px 15px',
      border: 'none',
      background: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: isMobile ? '13px' : '14px',
      borderRadius: '0', // Removed rounded corners from buttons
      transition: 'background-color 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    activeButton: {
      background: '#f59e0b',
      color: 'white'
    },
    logoutButton: {
      color: '#ff4444',
      marginTop: isMobile ? '15px' : '20px'
    },
    accountContent: {
      minHeight: isMobile ? '300px' : '400px'
    },
    mobileHeader: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '15px',
      padding: '10px 0',
      borderBottom: '1px solid #eee'
    },
    mobileMenuButton: {
      background: '#f59e0b',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '0', // Removed rounded corners
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px'
    },
    overlay: {
      display: isMobile && mobileMenuOpen ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999
    },
    closeButton: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#666',
      marginBottom: '15px'
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'history':
        return <History />;
      case 'wishlist':
        return <Wishlist />;
      case 'addresses':
        return <Addresses />;
      case 'account':
        return <AccountDetails />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={styles.userProfile}>
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div style={styles.breadcrumb}>
        <span 
          style={styles.breadcrumbLink}
          onClick={handleHomeClick}
          onMouseEnter={(e) => e.target.style.color = '#e67e22'}
          onMouseLeave={(e) => e.target.style.color = '#f59e0b'}
        >
          {isMobile ? <HomeIcon size={14} /> : null}
          Home
        </span>
        <span style={styles.breadcrumbSeparator}>›</span>
        <span 
          style={styles.breadcrumbLink}
          onClick={handleShopClick}
          onMouseEnter={(e) => e.target.style.color = '#e67e22'}
          onMouseLeave={(e) => e.target.style.color = '#f59e0b'}
        >
          {isMobile ? <ShoppingBag size={14} /> : null}
          Shop
        </span>
        <span style={styles.breadcrumbSeparator}>›</span>
        <span style={styles.breadcrumbCurrent}>My account</span>
      </div>

      {/* Mobile Header */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={16} />
            Menu
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-gray-900">
              {tabHeaders[activeTab].title}
            </h1>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {tabHeaders[activeTab].title}
          </h1>
          <div className="flex items-center justify-center space-x-1 mb-2">
            <span className="inline-block w-16 md:w-20 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-2 md:w-3 h-1 bg-yellow-600 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-yellow-600 rounded-full"></span>
          </div>
          <p className="text-gray-600">{tabHeaders[activeTab].description}</p>
        </div>
      )}

      <div style={styles.accountLayout}>
        {/* Mobile Sidebar - Now placed outside the main layout */}
        {isMobile && (
          <nav style={styles.accountSidebar}>
            <button 
              style={styles.closeButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
            
            <ul style={styles.sidebarList}>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'dashboard' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'orders' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('orders')}
                >
                  Orders
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'history' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('history')}
                >
                  History
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'wishlist' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('wishlist')}
                >
                  Wishlist
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'addresses' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('addresses')}
                >
                  Addresses
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'account' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('account')}
                >
                  Account details
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...styles.logoutButton
                  }}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Desktop Sidebar - Unchanged */}
        {!isMobile && (
          <nav style={styles.accountSidebar}>
            <ul style={styles.sidebarList}>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'dashboard' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('dashboard')}
                  onMouseEnter={(e) => activeTab !== 'dashboard' && (e.target.style.background = '#e8e8e8')}
                  onMouseLeave={(e) => activeTab !== 'dashboard' && (e.target.style.background = 'none')}
                >
                  Dashboard
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'orders' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('orders')}
                  onMouseEnter={(e) => activeTab !== 'orders' && (e.target.style.background = '#e8e8e8')}
                  onMouseLeave={(e) => activeTab !== 'orders' && (e.target.style.background = 'none')}
                >
                  Orders
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'history' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('history')}
                  onMouseEnter={(e) => activeTab !== 'history' && (e.target.style.background = '#e8e8e8')}
                  onMouseLeave={(e) => activeTab !== 'history' && (e.target.style.background = 'none')}
                >
                  History
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'wishlist' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('wishlist')}
                  onMouseEnter={(e) => activeTab !== 'wishlist' && (e.target.style.background = '#e8e8e8')}
                  onMouseLeave={(e) => activeTab !== 'wishlist' && (e.target.style.background = 'none')}
                >
                  Wishlist
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'addresses' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('addresses')}
                  onMouseEnter={(e) => activeTab !== 'addresses' && (e.target.style.background = '#e8e8e8')}
                  onMouseLeave={(e) => activeTab !== 'addresses' && (e.target.style.background = 'none')}
                >
                  Addresses
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...(activeTab === 'account' ? styles.activeButton : {})
                  }}
                  onClick={() => handleTabClick('account')}
                  onMouseEnter={(e) => activeTab !== 'account' && (e.target.style.background = '#e8e8e8')}
                  onMouseLeave={(e) => activeTab !== 'account' && (e.target.style.background = 'none')}
                >
                  Account details
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...styles.logoutButton
                  }}
                  onClick={handleLogout}
                  onMouseEnter={(e) => e.target.style.background = '#ffe8e8'}
                  onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        )}

        <main style={styles.accountContent}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;