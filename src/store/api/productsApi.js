import { apiSlice } from './authEndPoints';

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ department, category }) => {
        let url = `/products?department=${department}`;
        if (category) url += `&category=${category}`;
        return url;
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query({
      query: (department) => `/categories?department=${department}`,
      providesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
