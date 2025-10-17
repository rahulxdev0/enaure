//src/components/jewellery/userProfile/UserProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Home as HomeIcon, ShoppingBag, Gem, Crown } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Wishlist from './components/Wishlist';
import Addresses from './components/Addresses';
import AccountDetails from './components/AccountDetails';
import History from './components/History';
import useMobileCheck from '../../../hooks/useMobileCheck';

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

  const styles = {
    userProfile: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '15px' : '30px',
      fontFamily: '"Playfair Display", serif',
      background: 'linear-gradient(135deg, #fefefe 0%, #fafafa 100%)',
      minHeight: '100vh'
    },
    breadcrumb: {
      fontSize: isMobile ? '12px' : '14px',
      color: '#666',
      marginBottom: isMobile ? '20px' : '30px',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: isMobile ? '4px' : '8px',
      padding: '15px 0',
      borderBottom: '1px solid #f0f0f0'
    },
    breadcrumbLink: {
      color: '#b8860b',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: '500',
      padding: '4px 8px',
      borderRadius: '4px'
    },
    breadcrumbSeparator: {
      color: '#ccc',
      margin: '0 8px',
      fontWeight: '300'
    },
    breadcrumbCurrent: {
      color: '#333',
      fontWeight: '600'
    },
    accountLayout: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
      gap: isMobile ? '20px' : '50px',
      alignItems: 'start'
    },
    accountSidebar: {
      background: 'linear-gradient(135deg, #fff 0%, #f8f8f8 100%)',
      padding: isMobile ? '20px' : '25px',
      borderRadius: '0',
      border: '1px solid #e8e8e8',
      position: isMobile ? 'fixed' : 'static',
      top: isMobile ? '0' : 'auto',
      left: isMobile ? '0' : 'auto',
      right: isMobile ? '0' : 'auto',
      bottom: isMobile ? '0' : 'auto',
      zIndex: isMobile ? '1000' : 'auto',
      transform: isMobile ? (mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
      transition: isMobile ? 'transform 0.3s ease' : 'none',
      width: isMobile ? '300px' : 'auto',
      overflowY: isMobile ? 'auto' : 'visible',
      boxShadow: isMobile ? '2px 0 20px rgba(0,0,0,0.1)' : 'none'
    },
    sidebarList: {
      listStyle: 'none',
      padding: '0',
      margin: '0'
    },  
    sidebarItem: {
      marginBottom: '8px'
    },  
    sidebarButton: {
      width: '100%',
      padding: isMobile ? '14px 16px' : '16px 20px',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: isMobile ? '14px' : '15px',
      borderRadius: '0',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontWeight: '500',
      color: '#333',
      borderLeft: '3px solid transparent'
    },
    activeButton: {
      background: 'linear-gradient(135deg, #b8860b 0%, #d4af37 100%)',
      color: 'white',
      borderLeft: '3px solid #8b6914',
      boxShadow: '0 4px 15px rgba(184, 134, 11, 0.2)'
    },   
    logoutButton: {
      color: '#d32f2f',
      marginTop: '25px',
      border: '1px solid #ffcdd2',  
      background: '#fff'  
    },  
    accountContent: {
      minHeight: isMobile ? '300px' : '500px',
      background: 'white',
      border: '1px solid #e8e8e8'
    },
    mobileHeader: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      padding: '15px 0',
      borderBottom: '2px solid #b8860b'
    },  
    mobileMenuButton: {
      background: 'linear-gradient(135deg, #b8860b 0%, #d4af37 100%)',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '0',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 2px 10px rgba(184, 134, 11, 0.3)'
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
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#666', 
      marginBottom: '20px',  
      padding: '8px',
      borderRadius: '4px',
      background: '#f5f5f5'
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

      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span 
          style={styles.breadcrumbLink}
          onClick={handleHomeClick}
          onMouseEnter={(e) => {
            e.target.style.background = '#fff8e1';
            e.target.style.color = '#8b6914';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#b8860b';
          }}
        >
          <HomeIcon size={isMobile ? 14 : 16} />
          Home
        </span>
        <span style={styles.breadcrumbSeparator}>›</span>
        <span 
          style={styles.breadcrumbLink}
          onClick={handleShopClick}
          onMouseEnter={(e) => {
            e.target.style.background = '#fff8e1';
            e.target.style.color = '#8b6914';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#b8860b';
          }}
        >
          <ShoppingBag size={isMobile ? 14 : 16} />
          Shop
        </span>
        <span style={styles.breadcrumbSeparator}>›</span>
        <span style={styles.breadcrumbCurrent}>My Account</span>
      </div>

      {/* Mobile Header - Only Menu Button */}  
      {isMobile && (
        <div style={styles.mobileHeader}>
          <button  
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={18} />
            Menu
          </button>
        </div>
      )}

      <div style={styles.accountLayout}>
        {/* Mobile Sidebar */}
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
                  onMouseEnter={(e) => activeTab !== 'dashboard' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'dashboard' && (e.target.style.background = 'none')}
                >
                  <Crown size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'orders' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'orders' && (e.target.style.background = 'none')}
                >
                  <ShoppingBag size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'history' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'history' && (e.target.style.background = 'none')}
                >
                  <Gem size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'wishlist' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'wishlist' && (e.target.style.background = 'none')}
                >
                  <Gem size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'addresses' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'addresses' && (e.target.style.background = 'none')}
                >
                  <ShoppingBag size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'account' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'account' && (e.target.style.background = 'none')}
                >
                  <Crown size={18} />
                  Account Details
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...styles.logoutButton
                  }}
                  onClick={handleLogout}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ffebee';
                    e.target.style.color = '#c62828';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#d32f2f';
                  }}
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Desktop Sidebar */}
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
                  onMouseEnter={(e) => activeTab !== 'dashboard' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'dashboard' && (e.target.style.background = 'none')}
                >
                  <Crown size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'orders' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'orders' && (e.target.style.background = 'none')}
                >
                  <ShoppingBag size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'history' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'history' && (e.target.style.background = 'none')}
                >
                  <Gem size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'wishlist' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'wishlist' && (e.target.style.background = 'none')}
                >
                  <Gem size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'addresses' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'addresses' && (e.target.style.background = 'none')}
                >
                  <ShoppingBag size={18} />
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
                  onMouseEnter={(e) => activeTab !== 'account' && (e.target.style.background = '#fff8e1')}
                  onMouseLeave={(e) => activeTab !== 'account' && (e.target.style.background = 'none')}
                >
                  <Crown size={18} />
                  Account Details
                </button>
              </li>
              <li style={styles.sidebarItem}>
                <button 
                  style={{
                    ...styles.sidebarButton,
                    ...styles.logoutButton  
                  }}
                  onClick={handleLogout}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#ffebee';
                    e.target.style.color = '#c62828';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#d32f2f';
                  }}
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Main Content */}
        <main style={styles.accountContent}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;