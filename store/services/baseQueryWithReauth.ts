import { BASE_URL } from '@/lib/apiEndpoints';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addToast } from '../toast/toastSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // send cookies
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // Try to refresh the token
        api.dispatch(addToast({
                message: "Refreshing session. Please wait...",
                isError: false
            }))
        const refreshResult: any = await baseQuery({ url: '/auth/refresh', method: "POST" }, api, extraOptions);
        if (refreshResult?.data) {
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