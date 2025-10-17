import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'https://admin.enaure.com/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;

     headers.set('Accept', 'application/json');
     
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Auth', 'User', 'Profile'],
  endpoints: () => ({}),
});
