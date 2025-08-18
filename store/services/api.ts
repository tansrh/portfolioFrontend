import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/lib/apiEndpoints';
import baseQueryWithReauth from './baseQueryWithReauth';

export const api = createApi({
  reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ 
  //   baseUrl: BASE_URL,
  //   credentials: 'include',
  // }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Portfolio', 'Blog', 'U'] as const,
  endpoints: () => ({}),
});
