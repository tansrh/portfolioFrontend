import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { autoLoginThunk, forgotPasswordThunk, resetPasswordThunk, signInThunk, signoutThunk, signUpThunk } from "./authThunks";
import { Blog } from "../blogs/blogsSlice";

interface User {
    id: number;
    email: string;
    name: string;
    isVerified: boolean;
    blogs: Blog[]
}

interface AuthState {
    user: User | null;
    loading: boolean;
    errors: Record<string, string>;
    message: string;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    errors: {},
    message: "",

};

let errorClearTimer: NodeJS.Timeout | null = null;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
        clearErrors(state) {
            state.errors = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInThunk.pending, (state) => {
                state.loading = true;
                state.errors = {};
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(signInThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.errors = action.payload?.errors || {};
                state.message = action.payload?.message || "Sign in failed";
            })
            .addCase(signUpThunk.pending, (state) => {
                state.loading = true;
                state.errors = {};
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(signUpThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.errors = action.payload?.errors || {};
                state.message = action.payload?.message || "Sign up failed";
            })
            // Forgot Password
            .addCase(forgotPasswordThunk.pending, (state) => {
                state.loading = true;
                state.errors = {};
            })
            .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(forgotPasswordThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.errors = action.payload?.errors || {};
                state.message = action.payload?.message || "Forgot password failed";
            })
            // Reset Password
            .addCase(resetPasswordThunk.pending, (state) => {
                state.loading = true;
                state.errors = {};
            })
            .addCase(resetPasswordThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPasswordThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.errors = action.payload?.errors || {};
                state.message = action.payload?.message || "Reset password failed";
            })
            .addCase(signoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signoutThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(signoutThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.errors = action.payload?.errors || {};
                state.message = action.payload?.message || "Sign out failed";
            })
            .addCase(autoLoginThunk.pending, (state) => {
                state.loading = true;
                state.errors = {};
            })
            .addCase(autoLoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(autoLoginThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.errors = action.payload?.errors || {};
                state.message = action.payload?.message || "Auto login failed";
            });
    }
});

export const { setUser, clearUser, clearErrors } = authSlice.actions;
export default authSlice.reducer;
