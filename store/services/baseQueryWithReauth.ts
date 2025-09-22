import { BASE_URL } from '@/lib/apiEndpoints';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addToast } from '../toast/toastSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // send cookies
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Try to refresh the token
        api.dispatch(addToast({
            message: "Refreshing session. Please wait...",
            isError: false
        }))
        const refreshToken = localStorage.getItem('refreshToken') ?? undefined;
        
        const refreshResult: any = await baseQuery({
            url: '/auth/refresh', method: "POST", headers: {
                'x-refresh-token': refreshToken,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }, api, extraOptions);
        if (refreshResult?.data) {
            localStorage.setItem('accessToken', refreshResult.data.accessToken);
            localStorage.setItem('refreshToken', refreshResult.data.refreshToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Optionally handle logout here
            api.dispatch(addToast({
                message: "Session expired. Please log in again.",
                isError: false
            }))
            api.dispatch({ type: 'resetStore' });
        }
    }

    return result;
};

export default baseQueryWithReauth;