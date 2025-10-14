import React from 'react';

const ProductFilters = ({ onFilterChange, currentFilters, hideCategory = false }) => {
  // Default filters if currentFilters is undefined
  const filters = currentFilters || {
    category: '',
    brand: '',
    priceMin: 0,
    priceMax: 5000,
    offers: false,
    material: '',
    stone: '',
    color: '',
    rating: ''
  };

  const categories = [
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' }
  ];

  const brands = [
    { value: 'tiffany', label: 'Tiffany & Co.' },
    { value: 'cartier', label: 'Cartier' },
    { value: 'bulgari', label: 'Bulgari' },
    { value: 'van-cleef', label: 'Van Cleef & Arpels' }
  ];

  const materials = [
    { value: 'silver', label: 'Silver' },
    { value: 'gold', label: 'Gold' }
  ];

  const stones = [
    { value: 'diamond', label: 'Diamond' },
    { value: 'silver-stone', label: 'Silver stone' }
  ];

  const colors = [
    { value: 'white', label: 'White' },
    { value: 'yellow', label: 'Yellow' }
  ];

  const ratings = [
    { value: '5', label: 'Rated 5 out of 5' },
    { value: '4', label: 'Rated 4 out of 5' },
    { value: '3', label: 'Rated 3 out of 5' },
    { value: '2', label: 'Rated 2 out of 5' },
    { value: '1', label: 'Rated 1 out of 5' }
  ];

  const handleCategoryChange = (value) => {
    console.log('Category selected:', value);
    onFilterChange({ ...filters, category: value });
  };

  const handleBrandChange = (value) => {
    console.log('Brand selected:', value);
    onFilterChange({ ...filters, brand: value });
  };

  const handleMaterialChange = (value) => {
    console.log('Material selected:', value);
    onFilterChange({ ...filters, material: value });
  };

  const handleStoneChange = (value) => {
    console.log('Stone selected:', value);
    onFilterChange({ ...filters, stone: value });
  };

  const handleColorChange = (value) => {
    console.log('Color selected:', value);
    onFilterChange({ ...filters, color: value });
  };

  const handleRatingChange = (value) => {
    console.log('Rating selected:', value);
    onFilterChange({ ...filters, rating: value });
  };

  const handlePriceChange = (min, max) => {
    console.log('Price range selected:', { min, max });
    onFilterChange({ ...filters, priceMin: min, priceMax: max });
  };

  const handleOffersChange = (checked) => {
    console.log('On Sale filter:', checked);
    onFilterChange({ ...filters, offers: checked });
  };

  const resetAllFilters = () => {
    console.log('Resetting all filters');
    const defaultFilters = { 
      category: '', 
      brand: '', 
      priceMin: 0, 
      priceMax: 5000, 
      offers: false,
      material: '',
      stone: '',
      color: '',
      rating: ''
    };
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 w-64 mb-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">
          Filters
        </h2>
        <button
          onClick={resetAllFilters}
          className="text-sm text-gray-600 cursor-pointer underline hover:text-gray-800 transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Category Filter */}
      {!hideCategory && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Category
          </h3>
          <div className="flex flex-col gap-2">
            {categories.map(category => (
              <label key={category.value} className="flex items-center text-sm cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="mr-2 text-amber-500 focus:ring-amber-500"
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">
          Brand
        </h3>
        <div className="flex flex-col gap-2">
          {brands.map(brand => (
            <label key={brand.value} className="flex items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="brand"
                value={brand.value}
                checked={filters.brand === brand.value}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="mr-2 text-amber-500 focus:ring-amber-500"
              />
              {brand.label}
            </label>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">
          Material
        </h3>
        <div className="flex flex-col gap-2">
          {materials.map(material => (
            <label key={material.value} className="flex items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="material"
                value={material.value}
                checked={filters.material === material.value}
                onChange={(e) => handleMaterialChange(e.target.value)}
                className="mr-2 text-amber-500 focus:ring-amber-500"
              />
              {material.label}
            </label>
          ))}
        </div>
      </div>

      {/* Stone Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">
          Stone
        </h3>
        <div className="flex flex-col gap-2">
          {stones.map(stone => (
            <label key={stone.value} className="flex items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="stone"
                value={stone.value}
                checked={filters.stone === stone.value}
                onChange={(e) => handleStoneChange(e.target.value)}
                className="mr-2 text-amber-500 focus:ring-amber-500"
              />
              {stone.label}
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">
          Color
        </h3>
        <div className="flex flex-col gap-2">
          {colors.map(color => (
            <label key={color.value} className="flex items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color.value}
                checked={filters.color === color.value}
                onChange={(e) => handleColorChange(e.target.value)}
                className="mr-2 text-amber-500 focus:ring-amber-500"
              />
              {color.label}
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">
          Rating
        </h3>
        <div className="flex flex-col gap-2">
          {ratings.map(rating => (
            <label key={rating.value} className="flex items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating.value}
                checked={filters.rating === rating.value}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="mr-2 text-amber-500 focus:ring-amber-500"
              />
              {rating.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">
          Price Range
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceMax)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handlePriceChange(filters.priceMin, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="text-xs text-gray-600 text-center">
            ${filters.priceMin} - ${filters.priceMax}
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="mb-6">
        <label className="flex items-center text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.offers}
            onChange={(e) => handleOffersChange(e.target.checked)}
            className="mr-2 text-amber-500 focus:ring-amber-500 rounded"
          />
          On Sale
        </label>
      </div>

      {/* Clear All Filters Button */}
      <button
        onClick={resetAllFilters}
        className="w-full py-3 bg-transparent text-gray-600 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
      >
        Reset all filters
      </button>
    </div>
  );
};

export default ProductFilters;