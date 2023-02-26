import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentService = createApi({
  reducerPath: 'payment',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
    baseUrl: 'https://dull-foal-getup.cyclic.app/api/',
  }),
  endpoints: (builder) => ({
    sendPayment: builder.mutation({
      query: (data) => {
        return {
          url: '/create-checkout-session',
          method: 'POST',
          body: data,
        };
      },
    }),
    verifyPayment: builder.query({
      query: (id) => {
        return {
          url: `/verify-payment/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentService;

export default paymentService;
