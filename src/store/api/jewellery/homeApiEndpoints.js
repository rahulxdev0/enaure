import { api } from "../baseApi";

export const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 Get All Categories
    getCategories: builder.query({
      query: () => ({
        url: "/categories?store=jewellery-store",
        method: "GET",
      }),
      transformResponse: (response) => {
        const categoryData = response.data || [];

        return categoryData;
      },
      providesTags: ["Category"],
    }),

    // 🟣 Get All Products
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // 🟠 Get Top Products
    getTopProducts: builder.query({
      query: () => ({
        url: "/products/top",
        method: "GET",
      }),
      providesTags: ["TopProduct"],
    }),

    // 🟡 Get All Brands
    getBrands: builder.query({
      query: () => ({
        url: "/brands?store=jewellery-store",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    // 🔥 Get Trending Products
    getTrendingProducts: builder.query({
      query: () => ({
        url: "/products/trending",
        method: "GET",
      }),
      providesTags: ["TrendingProduct"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetTopProductsQuery,
  useGetBrandsQuery,
  useGetTrendingProductsQuery,
} = homeApi;
