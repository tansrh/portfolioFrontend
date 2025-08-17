import { api } from "./api";

export const uApi = api.injectEndpoints({
    endpoints: (builder)=>({
        getUPortfolio: builder.query({
            query: (portfolioUrl) => `/u/${portfolioUrl}`,
            providesTags: (result, error, portfolioUrl) => [{ type: "U", id: portfolioUrl }],
        })
    }),
    overrideExisting: false
})
export const {
    useGetUPortfolioQuery
} = uApi;