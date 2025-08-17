import { createSlice } from "@reduxjs/toolkit"
import { createBlogThunk, deleteBlogThunk, getBlogByIdThunk, getBlogsThunk, updateBlogThunk } from "./blogsThunk";

export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  portfolioId: string;
  userId: number;
}

const initialState = {
    blogs: [] as Blog[],
    loading: false,
    errors: {},
    selectedBlog: null as Blog | null,
}
const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setBlogs: (state, action)=>{
            state.blogs = action.payload;
        },
        setSelectedBlog: (state, action)=>{
            state.selectedBlog = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getBlogsThunk.pending, (state)=>{
            state.loading = true;
            state.errors = {};
        })
        .addCase(getBlogsThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs = action.payload.data || [];
        })
        .addCase(getBlogsThunk.rejected, (state, action: any)=>{
            state.loading = false;
            state.errors = action.payload?.errors || {};
        })
        .addCase(createBlogThunk.pending, (state)=>{
            state.loading = true;
            state.errors = {};
        })
        .addCase(createBlogThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs.unshift(action.payload.data);
        })
        .addCase(createBlogThunk.rejected, (state, action: any)=>{
            state.loading = false;
            state.errors = action.payload?.errors || {};
        })
        .addCase(deleteBlogThunk.pending, (state)=>{
            state.loading = true;
            state.errors = {};
        })      
        .addCase(deleteBlogThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.blogs = state.blogs.filter((blog: any) => blog.id !== action.payload.data.id);
        })
        .addCase(deleteBlogThunk.rejected, (state, action: any)=>{
            state.loading = false;
            state.errors = action.payload?.errors || {};
        })
        .addCase(updateBlogThunk.pending, (state)=>{
            state.loading = true;
            state.errors = {};
        })
        .addCase(updateBlogThunk.fulfilled, (state, action)=>{
            state.loading = false;
            console.log(action.payload);
            const index = state.blogs.findIndex((blog: any) => blog.id === action.payload.data.id);
            console.log("Index of updated blog:", index);
            if (index !== -1) {
                state.blogs[index] = action.payload.data;
            }
        })
        .addCase(updateBlogThunk.rejected, (state, action: any)=>{
            state.loading = false;
            state.errors = action.payload?.errors || {};
        })  
        .addCase(getBlogByIdThunk.pending, (state)=>{
            state.loading = true;
            state.errors = {};
        })
        .addCase(getBlogByIdThunk.fulfilled, (state, action)=>{
            state.loading = false;
            const index = state.blogs.findIndex((blog: any) => blog.id === action.payload.data.id);
            if (index !== -1) {
                state.blogs[index] = action.payload.data;
            }
        })
        .addCase(getBlogByIdThunk.rejected, (state, action: any)=>{
            state.loading = false;
            state.errors = action.payload?.errors || {};
        })
        
    }
})
export const { setBlogs, setSelectedBlog } = blogsSlice.actions;
export default blogsSlice.reducer;