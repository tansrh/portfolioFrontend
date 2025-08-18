import { api } from "./api";

export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        contactUs: builder.mutation({
            query: (data) => ({
                url: "/contact",
                method: "POST",
                body: data,
                validateStatus: (response: any, result: any) => {
                    return response.status === 200;
                }
            }),
        }),
    }),
    overrideExisting: false,
})
export const { useContactUsMutation } = contactApi;