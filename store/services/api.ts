import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/lib/apiEndpoints';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['Portfolio', 'Blog', 'U'] as const,
  endpoints: () => ({}),
});
