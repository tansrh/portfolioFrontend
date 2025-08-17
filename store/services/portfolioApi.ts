import { api } from './api';

export interface Portfolio {
  id: string;
  // add other portfolio fields
}

export const portfolioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query<Portfolio[], void>({
      query: () => 'portfolio',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Portfolio' as const, id })),
              { type: 'Portfolio', id: 'LIST' },
            ]
          : [{ type: 'Portfolio', id: 'LIST' }],
      keepUnusedDataFor: 30000,
    }),
    
    getPortfolioById: builder.query<Portfolio, string>({
      query: (id) => `portfolios/${id}`,
      providesTags: (result, error, id) => [{ type: 'Portfolio', id }],
      keepUnusedDataFor: 30000,
    }),
    
    createPortfolio: builder.mutation<Portfolio, Partial<Portfolio>>({
      query: (portfolio) => ({
        url: 'portfolio',
        method: 'POST',
        body: portfolio,
      }),
      // Invalidate the list so new portfolios appear
      invalidatesTags: [{ type: 'Portfolio', id: 'LIST' }],
    }),
    
    updatePortfolio: builder.mutation<Portfolio, Partial<Portfolio>>({
      query: (portfolio) => ({
        url: 'portfolio',
        method: 'PUT',
        body: portfolio,
      }),
      async onQueryStarted(portfolio, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          portfolioApi.util.updateQueryData(
            'getPortfolioById',
            portfolio.id as string,
            (draft) => {
              Object.assign(draft, portfolio);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      // Invalidate the updated portfolio and the list
      invalidatesTags: (result, error, portfolio) => [
        { type: 'Portfolio', id: portfolio.id },
        { type: 'Portfolio', id: 'LIST' },
      ],
    }),
    
    deletePortfolio: builder.mutation<void, string>({
      query: (id) => ({
        url: 'portfolio',
        method: 'DELETE',
        body: { id },
      }),
      // Invalidate the deleted portfolio and the list
      invalidatesTags: (result, error, id) => [
        { type: 'Portfolio', id },
        { type: 'Portfolio', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioByIdQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
