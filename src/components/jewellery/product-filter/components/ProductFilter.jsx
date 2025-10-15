import React from 'react';
import { useGetBrandsQuery, useGetCategoriesQuery } from '../../../../store/api/jewellery/homeApiEndpoints';
import { useGetProductMaterialQuery, useGetProductPurityQuery } from '../../../../store/api/productsApi';

const ProductFilters = ({ onFilterChange, currentFilters, hideCategory = false }) => {
  const {data: categoryData, isLoading, error} = useGetCategoriesQuery();
  const { data: brand} = useGetBrandsQuery();
  const {data: productMaterial} = useGetProductMaterialQuery();
  const {data: productPurity} = useGetProductPurityQuery()

  const brandsData = brand?.data || []
  const materialData = productMaterial?.data?.materials || []
  const purityData = productPurity?.data?.puritys || []


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

  const categories = categoryData?.map(cat => ({
    value: cat.id,
    label: cat.name
  })) || [];

  const brands = brandsData?.map(brand => ({
    value: brand.id,
    label: brand.slug.charAt(0).toUpperCase() + brand.slug.slice(1)
  })) || [];

  const materials = materialData?.map(material => ({
    value: material.toLowerCase(),
    label: material
  })) || [];


  const handleCategoryChange = (value) => {
    const numValue = Number(value);
    console.log('Category selected:', numValue);
    console.log('Selected category filter:', numValue);
    onFilterChange({ ...filters, category: numValue });
  };

  const handleBrandChange = (value) => {
    const numValue = Number(value);
    console.log('Brand selected:', numValue);
    console.log('Selected brand filter:', numValue);
    onFilterChange({ ...filters, brand: numValue });
  };

  const handleMaterialChange = (value) => {
    console.log('Material selected:', value);
    console.log('Selected material filter:', value);
    onFilterChange({ ...filters, material: value });
  };

  const handlePriceChange = (min, max) => {
    console.log('Price range selected:', { min, max });
    console.log('Selected price filter:', { priceMin: min, priceMax: max });
    onFilterChange({ ...filters, priceMin: min, priceMax: max });
  };

  const handleOffersChange = (checked) => {
    console.log('On Sale filter:', checked);
    console.log('Selected offers filter:', checked);
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

      {/* Active Filters Display */}
      {(filters.category || filters.brand || filters.material || filters.offers) && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs font-semibold text-amber-800 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">
                Category: {categories.find(c => c.value === filters.category)?.label}
              </span>
            )}
            {filters.brand && (
              <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">
                Brand: {brands.find(b => b.value === filters.brand)?.label}
              </span>
            )}
            {filters.material && (
              <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">
                Material: {materials.find(m => m.value === filters.material)?.label}
              </span>
            )}
            {filters.offers && (
              <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">
                On Sale
              </span>
            )}
          </div>
        </div>
      )}

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
                  checked={Number(filters.category) === Number(category.value)}
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
                checked={Number(filters.brand) === Number(brand.value)}
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