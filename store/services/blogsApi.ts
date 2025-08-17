import { api } from "./api";

export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  portfolioId: string;
  userId: string;
  createdAt: string;
}

export const blogsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], string>({
      query: (portfolioId) => `blogs?portfolioId=${portfolioId}`,
      providesTags: (result, error, portfolioId) =>
        result
          ? [
              // Tag for each blog
              ...result.map(({ id }) => ({ type: 'Blog' as const, id })),
              // Tag for the list of blogs for this portfolio
              { type: 'Blog' as const, id: `LIST-${portfolioId}` }
            ]
          : [{ type: 'Blog' as const, id: `LIST-${portfolioId}` }]
    }),

    getBlogById: builder.query<Blog, string>({
      query: (id) => `blogs/${id}`,
      providesTags: (result, error, id) =>
        result
          ? [
              { type: 'Blog', id: result.id }
            ]
          : [{ type: 'Blog', id }]
    }),

    createBlog: builder.mutation<Blog, Partial<Blog>>({
      query: (blog) => ({
        url: 'blogs',
        method: 'POST',
        body: blog
      }),
      invalidatesTags: (result, error, blog) => [
        { type: 'Blog', id: `LIST-${blog.portfolioId}` }
      ]
    }),

    updateBlog: builder.mutation<Blog, Partial<Blog>>({
      query: (blog) => ({
        url: `blogs/${blog.id}`,
        method: 'PUT',
        body: blog
      }),
      async onQueryStarted(blog, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          blogsApi.util.updateQueryData('getBlogById', blog.id as string, (draft) => {
            Object.assign(draft, blog)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, blog) => [
        { type: 'Blog', id: blog.id },
        { type: 'Blog', id: `LIST-${blog.portfolioId}` }
      ]
    }),

    deleteBlog: builder.mutation<void, { id: string; portfolioId: string }>({
      query: ({ id, portfolioId }) => ({
        url: `blogs/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, { id, portfolioId }) => [
        { type: 'Blog', id },
        { type: 'Blog', id: `LIST-${portfolioId}` }
      ]
    })
  }),
  overrideExisting: false
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation
} = blogsApi;