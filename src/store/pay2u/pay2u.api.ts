/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
  phone_number: string;
}

interface LoginResponse {
  token: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pay2u.ddns.net/api/',
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Subscriptions', 'Merch', 'AllReports'],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/token/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    getUser: build.query<UserType, void>({
      query: () => ({
        url: 'my/',
      }),
    }),
    getMyCardInfo: build.query<MyCardType, { id: number }>({
      query: ({ id }) => ({
        url: `v1/subscriptions/${id}/`,
      }),
      providesTags: ['Subscriptions'],
    }),
    getCovers: build.query<MyCardType[], void>({
      query: () => ({
        url: 'v1/covers/',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useGetMyCardInfoQuery, useGetCoversQuery } = api;
