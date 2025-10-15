import { api } from "./baseApi";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAndFilterProducts: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `/shop?${queryString}`;
      },
      transformResponse: (response) => {
        return {
          products: response?.data?.data?.data ?? [],
          pagination: response?.data?.data?.pagination ?? {},
        };
      },
      providesTags: ['Products'],
    }),
    // Get Product by Slug
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/products/${slug}?store=jewellery-store`,
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log('Product API Response:', response); // Debug log
        return response.data?.product || {};
      },
      providesTags: (result, error, slug) => [{ type: "Product", slug }],
    }),

    // Get Product Combination
    getProductCombination: builder.query({
      query: ({ slug, combinationId }) => ({
        url: `/products/${slug}/combinations/${combinationId}?store=jewellery-store`,
        method: "GET",
      }),
      transformResponse: (response) => response.data?.product || {},
      providesTags: ["ProductCombination"],
    }),
    getProductMaterial: builder.query({
      query: () => ({
        url: `/products/material?store=jewellery-store`,
        method: "GET",
      }),
    }),
    getProductPurity: builder.query({
      query: () => ({
        url: `/products/purity?store=jewellery-store`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductBySlugQuery,
  useGetProductCombinationQuery,
  useGetAndFilterProductsQuery,
  useGetProductMaterialQuery,
  useGetProductPurityQuery
} = productApi;