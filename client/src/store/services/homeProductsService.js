import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const homeProductsService = createApi({
  reducerPath: 'homeProducts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dull-foal-getup.cyclic.app/api/',
  }),
  endpoints: (builder) => ({
    getProductsFromCategory: builder.query({
      query: ({ name, page }) => {
        return {
          url: `/cat-products/${name}/${page}`,
          method: 'GET',
        };
      },
    }),
    searchProducts: builder.query({
      query: ({ keyword, page }) => {
        return {
          url: `/search-products/${keyword}/${page}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProductsFromCategoryQuery, useSearchProductsQuery } =
  homeProductsService;

export default homeProductsService;
