import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authService = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dull-foal-getup.cyclic.app/api/',
  }),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (loginData) => {
        return {
          url: '/login',
          method: 'POST',
          body: loginData,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: '/register',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useAuthLoginMutation, useRegisterUserMutation } = authService;

export default authService;
