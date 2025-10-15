// import { apiSlice } from './authEndPoints';

// export const productsApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ department, category }) => {
//         let url = `/products?department=${department}`;
//         if (category) url += `&category=${category}`;
//         return url;
//       },
//       providesTags: ['Products'],
//     }),
//     getProductById: builder.query({
//       query: (id) => `/products/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Products', id }],
//     }),
//     getCategories: builder.query({
//       query: (department) => `/categories?department=${department}`,
//       providesTags: ['Categories'],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useGetCategoriesQuery,
// } = productsApi;





// src/store/api/productsApi.js
// src/services/productApi.js
import { api } from "./baseApi";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetProductBySlugQuery,
  useGetProductCombinationQuery,
} = productApi;