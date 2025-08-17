import { BLOGS_URL } from "@/lib/apiEndpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBlogsThunk = createAsyncThunk("blogs/get", async (portfolioId: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BLOGS_URL}?portfolioId=${portfolioId}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        if (response.status !== 200) {
            return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
        }
        
        return { status: 200, message: data.message, data: data };
    } catch (error: any) {
        return rejectWithValue({ status: 500, message: error.message || "Something went wrong" });
    }
});

export const createBlogThunk = createAsyncThunk("blogs/create", async (formData: { title: String, content: String, imageUrl: string, portfolioId: String, userId: number}, {rejectWithValue})=>{
    try{
        const response = await fetch(BLOGS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({ ...formData }),
            credentials: "include"
        })
        const result = await response.json();
        if(response.status !== 200){
            return rejectWithValue({ status: 400, errors: result.errors || {}, message: result.message });
        }
        return { status: 200, message: result.message, data: result.data };

    }
    catch(error: any){
        return rejectWithValue({ status: 500, message: error.message || "Something went wrong" });
    }
})

export const deleteBlogThunk = createAsyncThunk("blogs/delete", async (id: string, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BLOGS_URL}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({ id }),
            credentials: "include"
        })
        const result = await response.json();
        if(response.status !== 200){
            return rejectWithValue({ status: 400, errors: result.errors || {}, message: result.message });
        }
        return { status: 200, message: result.message, data: {id: result.data} };
    }
    catch(error: any){
        return rejectWithValue({ status: 500, message: error.message || "Something went wrong" });
    }
})  

export const updateBlogThunk = createAsyncThunk("blogs/update", async (formData: { id: string, title: String, content: String, imageUrl?: string | undefined }, {rejectWithValue})=>{
    try{
        const response = await fetch(`${BLOGS_URL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({ title: formData.title, content: formData.content, id: formData.id, imageUrl: formData.imageUrl }),
            credentials: "include"
        })
        const result = await response.json();
        if(response.status !== 200){
            return rejectWithValue({ status: 400, errors: result.errors || {}, message: result.message });
        }
        return { status: 200, message: result.message, data: result.data };
    }
    catch(error: any){
        return rejectWithValue({ status: 500, message: error.message || "Something went wrong" });
    }
});

export const getBlogByIdThunk = createAsyncThunk("blogs/getById", async (id: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BLOGS_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await response.json();
        if (response.status !== 200) {
            return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
        }
        return { status: 200, message: data.message, data: data.data };
    } catch (error: any) {
        return rejectWithValue({ status: 500, message: error.message || "Something went wrong" });
    }
});