import { PORTFOLIOS_URL } from "@/lib/apiEndpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProtfoliosThunk = createAsyncThunk("portfolio/get", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(PORTFOLIOS_URL, {
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
    return { status: 200, message: data.message, data };
  } catch (error: any) {
    return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
  }
});

export const createPortfolioThunk = createAsyncThunk("portfolio/create", async (formData: any, { rejectWithValue }) => {
  try {
    const response = await fetch(PORTFOLIOS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
      credentials: "include"
    });
    const data = await response.json();
    if (response.status !== 201) {
      return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
    }
    return { status: 201, message: data.message, data: data.data };
  } catch (error: any) {
    return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
  }
});

export const deletePortfolioThunk = createAsyncThunk("portfolio/delete", async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(PORTFOLIOS_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }),
      credentials: "include"
    });
    const data = await response.json();
    if (response.status !== 200) {
      return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
    }
    return { status: 200, message: data.message, data: data.data };
  } catch (error: any) {
    return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
  }
});

export const updatePortfolioThunk = createAsyncThunk("portfolio/update", async (formData: any, { rejectWithValue }) => {
  try {
    const response = await fetch(PORTFOLIOS_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
      credentials: "include"
    });
    const data = await response.json();
    if (response.status !== 200) {
      return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
    }
    return { status: 200, message: data.message, data: data.data };
  } catch (error: any) {
    return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
  }
});

export const getPortfolioByIdThunk = createAsyncThunk("portfolio/getById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`${PORTFOLIOS_URL}/${id}`, {
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
    return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
  }
});