import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productService = createApi({
  reducerPath: 'product',
  tagTypes: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dull-foal-getup.cyclic.app/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.adminToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        invalidatesTags: ['products'],
        query: (product) => {
          return {
            url: '/create-product',
            method: 'POST',
            body: product,
          };
        },
      }),

      getProducts: builder.query({
        providesTags: ['products'],
        query: (page) => {
          return {
            url: `/products/${page}`,
            method: 'GET',
          };
        },
      }),
      getProduct: builder.query({
        providesTags: ['products'],
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: 'GET',
          };
        },
      }),
      updateProduct: builder.mutation({
        invalidatesTags: ['products'],
        query: (data) => {
          return {
            url: '/product',
            method: 'PUT',
            body: data,
          };
        },
      }),
      deleteProduct: builder.mutation({
        invalidatesTags: ['products'],
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productService;

export default productService;
