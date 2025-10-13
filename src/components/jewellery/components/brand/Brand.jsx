import React from 'react'
import { useGetBrandsQuery } from '../../../../store/api/jewellery/homeApiEndpoints'

const Brand = () => {
  const {data, isLoading: isLoadingBrand, isError} = useGetBrandsQuery();
  const brandData = data?.data || [];
  
  return (
    <div>Brand</div>
  )
}

export default Brand