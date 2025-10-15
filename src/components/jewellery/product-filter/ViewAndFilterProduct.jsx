import React, { useState, useMemo } from "react";
import SearchProduct from "./components/SearchProduct";
import ProductSection from "./components/ProductSection";
import ProductFilters from "./components/ProductFilter";
import { useGetAndFilterProductsQuery } from "../../../store/api/productsApi";

const ViewAndFilterProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceMin: 0,
    priceMax: 50000,
    offers: false,
    material: '',
    stone: '',
    color: '',
    rating: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Build params object, excluding empty/null values
  const params = useMemo(() => {
    const queryParams = {
      store: "jewellery-store",
      page: currentPage,
    };

    // Add search if not empty
    if (searchQuery && searchQuery.trim() !== '') {
      queryParams.search = searchQuery.trim();
    }

    // Add category_id if selected
    if (filters.category && filters.category !== '') {
      queryParams['category_id[]'] = filters.category;
    }

    // Add brand_id if selected
    if (filters.brand && filters.brand !== '') {
      queryParams.brand_id = filters.brand;
    }

    // Add price range if not default
    if (filters.priceMin > 0) {
      queryParams.min_price = filters.priceMin;
    }
    if (filters.priceMax < 5000) {
      queryParams.max_price = filters.priceMax;
    }

    // Add material if selected
    if (filters.material && filters.material !== '') {
      queryParams.materials = filters.material;
    }

    // Add stone if selected
    if (filters.stone && filters.stone !== '') {
      queryParams.stones = filters.stone;
    }

    // Add color if selected
    if (filters.color && filters.color !== '') {
      queryParams.color = filters.color;
    }

    // Add rating if selected
    if (filters.rating && filters.rating !== '') {
      queryParams.rating = filters.rating;
    }

    console.log('API Params:', queryParams);
    return queryParams;
  }, [searchQuery, filters, currentPage]);

  const { data, isLoading: isLoadingProduct } = useGetAndFilterProductsQuery(params);
  const productData = data?.products || [];

  const handleSearchValue = (searchData) => {
    console.log("Search data:", searchData);
    setSearchQuery(searchData);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (newFilters) => {
    console.log("Filter changed:", newFilters);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  return (
    <div className="">
      <SearchProduct 
        getSearchValue={handleSearchValue} 
        isLoading={isLoadingProduct}
      />
      <div className="flex w-full max-w-6xl mx-auto gap-8 px-4">
        <div className="hidden md:block">
          <ProductFilters 
            onFilterChange={handleFilterChange} 
            currentFilters={filters}
          />
        </div>
        <ProductSection 
          productData={productData} 
          isLoading={isLoadingProduct}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ViewAndFilterProduct;
