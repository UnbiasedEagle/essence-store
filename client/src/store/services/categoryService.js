import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryService = createApi({
  reducerPath: 'category',
  tagTypes: 'categories',
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
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      invalidatesTags: ['categories'],
      query: (category) => {
        return {
          url: '/create-category',
          method: 'POST',
          body: category,
        };
      },
    }),
    getCategories: builder.query({
      providesTags: ['categories'],
      query: (page) => {
        return {
          url: `/categories/${page}`,
          method: 'GET',
        };
      },
    }),
    fetchCategory: builder.query({
      query: (id) => {
        return {
          url: `/fetch-category/${id}`,
          method: 'GET',
        };
      },
    }),
    updateCategory: builder.mutation({
      invalidatesTags: ['categories'],
      query: (data) => {
        return {
          url: `/update-category/${data.id}`,
          method: 'PUT',
          body: {
            name: data.name,
          },
        };
      },
    }),

    deleteCategory: builder.mutation({
      invalidatesTags: ['categories'],
      query: (id) => {
        return {
          url: `/delete-category/${id}`,
          method: 'DELETE',
        };
      },
    }),

    fetchAllCategories: builder.query({
      query: () => {
        return {
          url: '/all-categories',
          method: 'GET',
        };
      },
    }),

    randomCategories: builder.query({
      query: () => {
        return {
          url: '/random-categories',
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchAllCategoriesQuery,
  useRandomCategoriesQuery,
} = categoryService;

export default categoryService;
