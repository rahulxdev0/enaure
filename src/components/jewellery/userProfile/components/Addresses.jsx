
import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Edit2, Trash2, Home, Building, X, Check } from 'lucide-react';
// Import the custom hook
import useMobileCheck from '../../../../hooks/useMobileCheck'; 

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const isMobile = useMobileCheck(); // <--- Use the hook

  const [formData, setFormData] = useState({
    name: '',
    type: 'home',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false,
    phone: ''
  });

  // Mock data (omitted for brevity)
  const mockAddresses = [
    { 
      id: 1, 
      name: 'John Doe', 
      type: 'home',
      street: '123 Main Street', 
      apartment: 'Apt 4B',
      city: 'New York', 
      state: 'NY', 
      zipCode: '10001', 
      country: 'United States', 
      phone: '+1 (555) 123-4567',
      isDefault: true 
    },
    { 
      id: 2, 
      name: 'John Doe', 
      type: 'work',
      street: '456 Business Avenue', 
      apartment: 'Suite 1200',
      city: 'Los Angeles', 
      state: 'CA', 
      zipCode: '90210', 
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false 
    },
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setAddresses(mockAddresses);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingAddress) {
        setAddresses(addresses.map(addr => 
          addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
        ));
      } else {
        const newAddress = { ...formData, id: Date.now() };
        setAddresses([...addresses, newAddress]);
      }
      
      // Handle setting new address as default and unsetting others
      if (formData.isDefault) {
        setAddresses(prev => prev.map(addr => ({
          ...addr,
          isDefault: addr.id === (editingAddress?.id || Date.now()) // Use Date.now() for new address before it's set
            ? true
            : false
        })));
      }

      setShowAddForm(false);
      setEditingAddress(null);
      setFormData({
        name: '',
        type: 'home',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        isDefault: false,
        phone: ''
      });
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowAddForm(true);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setAddresses(addresses.filter(addr => addr.id !== addressId));
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      type: 'home',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false,
      phone: ''
    });
  };

  const getAddressTypeIcon = (type) => {
    return type === 'home' ? <Home className="w-4 h-4" /> : <Building className="w-4 h-4" />;
  };

  const getAddressTypeColor = (type) => {
    return type === 'home' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600';
  };

  // Show centered loader when loading initial data
  if (loading && !showAddForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center -mt-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="text-lg text-gray-600">Loading your addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Address Form - Adjusted for mobile grid */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MapPin className="w-6 h-6 text-yellow-600 mr-2" />
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button
                onClick={cancelForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Responsive Grid: 1 column on mobile, 2 on desktop */}
              <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}> 
                {/* Full Name and Phone (now stacked on mobile) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Street Address & Apartment (unchanged) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  value={formData.street}
                  onChange={(e) => setFormData({...formData, street: e.target.value})}
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  value={formData.apartment}
                  onChange={(e) => setFormData({...formData, apartment: e.target.value})}
                  placeholder="Apt 4B, Suite 1200, etc."
                />
              </div>

              {/* Responsive Grid: City, State, ZIP */}
              <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-6'}`}>
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="New York"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    placeholder="NY"
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    placeholder="10001"
                  />
                </div>
              </div>

              {/* Address Type and Default Checkbox (stacked on mobile) */}
              <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Type
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'home'})}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-200 ${
                        formData.type === 'home'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 text-gray-600 hover:border-yellow-400'
                      }`}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'work'})}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-200 ${
                        formData.type === 'work'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 text-gray-600 hover:border-yellow-400'
                      }`}
                    >
                      <Building className="w-4 h-4 mr-2" />
                      Work
                    </button>
                  </div>
                </div>

                <div className={`${isMobile ? 'pt-4' : 'flex items-center pt-8'}`}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 border-2 rounded-md mr-3 flex items-center justify-center transition-all duration-200 ${
                      formData.isDefault
                        ? 'bg-yellow-500 border-yellow-500'
                        : 'bg-white border-gray-300'
                    }`}>
                      {formData.isDefault && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Set as default address
                    </span>
                  </label>
                </div>
              </div>

              {/* Form Actions (full width on mobile) */}
              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'space-x-4 pt-4'}`}>
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    ${isMobile ? 'w-full' : 'flex-1'}
                    bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold 
                    hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
                    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {editingAddress ? 'Updating...' : 'Adding...'}
                    </div>
                  ) : (
                    editingAddress ? 'Update Address' : 'Add Address'
                  )}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className={`
                    ${isMobile ? 'w-full' : 'px-6'}
                    py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 
                    transition-colors duration-200
                  `}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses Grid */}
        {addresses.length === 0 && !showAddForm ? (
          // Empty state... (omitted for brevity)
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses saved</h3>
              <p className="text-gray-600 mb-6">
                You haven't added any addresses yet. Add your first address to get started!
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Address
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Address Cards - Responsive grid change */}
            <div className={`grid grid-cols-1 gap-6 mb-8 ${isMobile ? 'md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-2'}`}>
              {addresses.map(address => (
                <div
                  key={address.id}
                  className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
                    address.isDefault
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  {/* ... Address Card content (omitted for brevity) */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${getAddressTypeColor(address.type)}`}>
                          {getAddressTypeIcon(address.type)}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {address.type} Address
                          </h3>
                          {address.isDefault && (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(address)}
                          className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit address"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{address.name}</p>
                      <p className="text-gray-600">{address.street}</p>
                      {address.apartment && (
                        <p className="text-gray-600">{address.apartment}</p>
                      )}
                      <p className="text-gray-600">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p className="text-gray-600">{address.country}</p>
                      <p className="text-gray-600">{address.phone}</p>
                    </div>
                    {address.isDefault && (
                      <div className="mt-4 pt-4 border-t border-yellow-200">
                        <div className="flex items-center text-sm text-yellow-700">
                          <Check className="w-4 h-4 mr-1" />
                          This is your default shipping address
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Address Button */}
            {!showAddForm && (
              <div className="text-center">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Address
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Addresses;