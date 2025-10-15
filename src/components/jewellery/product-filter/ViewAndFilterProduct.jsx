import React from 'react'
import SearchProduct from './components/SearchProduct'
import ProductSection from './components/ProductSection'
import ProductFilters from './components/ProductFilter'

const ViewAndFilterProduct = () => {
  return (
    <div className=''>
        <SearchProduct />
        <div className="flex w-full max-w-6xl mx-auto gap-8">
            <div className="hidden md:block">
                <ProductFilters />
            </div>
            <ProductSection />
        </div>
    </div>
  )
}

export default ViewAndFilterProduct