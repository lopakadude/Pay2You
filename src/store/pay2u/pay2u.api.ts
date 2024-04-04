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
  tagTypes: ['Auth', 'Subscription', 'User'],
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
      providesTags: ['User'],
    }),
    getMyCardInfo: build.query<MyCardType, number>({
      query: (id) => ({
        url: `v1/subscriptions/${id}/`,
      }),
      providesTags: ['Subscription'],
    }),
    getCovers: build.query<{ results: MyCardType[] }, void>({
      query: () => ({
        url: 'v1/covers/',
      }),
    }),
    getCategories: build.query<{ id: number; name: string }[], void>({
      query: () => ({
        url: 'v1/categories/',
      }),
    }),
    getCoverInfo: build.query<CoverCardType, number>({
      query: (id) => ({
        url: `v1/covers/${id}/`,
      }),
    }),
    patchAutorenewalFalseCard: build.mutation<unknown, number>({
      query: (id) => ({
        url: `v1/subscriptions/${id}/`,
        method: 'PATCH',
        body: {
          autorenewal: false,
        },
      }),
      invalidatesTags: ['User'],
    }),
    patchAutorenewalTrueCard: build.mutation<unknown, number>({
      query: (cardId) => ({
        url: `v1/subscriptions/${cardId}/`,
        method: 'PATCH',
        body: {
          autorenewal: true,
        },
      }),
      invalidatesTags: ['User'],
    }),
    postNewActiveSub: build.mutation<any, any>({
      query: (data) => ({
        url: 'v1/subscriptions/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGetUserQuery,
  useLazyGetMyCardInfoQuery,
  useLazyGetCoversQuery,
  useLazyGetCoverInfoQuery,
  usePatchAutorenewalFalseCardMutation,
  usePatchAutorenewalTrueCardMutation,
  usePostNewActiveSubMutation,
  useGetCategoriesQuery,
} = api;
