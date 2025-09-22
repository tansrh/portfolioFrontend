import { createAsyncThunk } from '@reduxjs/toolkit';
import { FORGOT_PASSWORD_URL, RESET_PASSWORD_URL, SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL, USER_URL } from '@/lib/apiEndpoints';
import { setUser } from './authSlice';
import { api } from '../services/api';
import { portfolioApi } from '../services/portfolioApi';
import baseQueryWithReauth from '../services/baseQueryWithReauth';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (formData: { name: string; email: string; password: string; confirmPassword: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
      }
      return { status: 200, message: data.message, data: data.data };
    } catch (error: any) {
      return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
    }
  }
);

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (formData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
      }
      // Set user in Redux store
      dispatch(setUser(data.data));
      const { accessToken, refreshToken } = data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(portfolioApi.endpoints.getPortfolios.initiate());
      return { status: 200, message: data.message, data: data.data };
    } catch (error: any) {
      return rejectWithValue({ status: 410, message: error.message || 'Something went wrong. Please try again later.' });
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk("auth/forgotPassword", async (formData: { email: string }, { rejectWithValue }) => {
  try {
    const result = await fetch(FORGOT_PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await result.json();
    if (result.status !== 200) {
      return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
    }
    return { status: 200, message: data.message, data: data.data };
  }
  catch (error: any) {
    return rejectWithValue({ status: 410, message: error.message || "Something went wrong. Please try again later." });
  }
})

export const resetPasswordThunk = createAsyncThunk("auth/resetPassword", async (formData: { email: string, token: string, password: string, confirmPassword: string }, { rejectWithValue }) => {
  try {
    const response = await fetch(RESET_PASSWORD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.status !== 200) {
      return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
    }
    return { status: 200, message: data.message };
  } catch (error: any) {
    return rejectWithValue({ status: 500, message: error.message || 'Something went wrong' });
  }
})

export const signoutThunk = createAsyncThunk("api/signout", async (_, { dispatch, rejectWithValue, }) => {
  try {
    const response = await fetch(SIGNOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    if (response.status !== 200) {
      return rejectWithValue({ status: 400, errors: data.errors || {}, message: data.message });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(setUser(null));
    return { status: 200, message: "Sign out successful" };
  } catch (error: any) {
    return rejectWithValue({ status: 500, message: error.message || 'Sign out failed' });
  }
});

export const autoLoginThunk = createAsyncThunk("api/autoLogin", async (_, { dispatch, rejectWithValue }) => {
  try {
    const result: any = await baseQueryWithReauth(
      { url: USER_URL, method: "GET" },
      { dispatch },
      {}
    );
    console.log(result, "auto login result");
    if (result.error) {
      return rejectWithValue({ status: result.error.status || 400, message: result.error.data?.message || "Auto login failed" });
    }
    else {
      dispatch(setUser(result.data.user));
      return { status: 200, message: "Auto login successful", data: result.data };
    }

  } catch (error: any) {
    return rejectWithValue({ status: 500, message: error.message || 'Auto login failed' });
  }
});