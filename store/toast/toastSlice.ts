import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastMessage {
  id: string;
  message: string;
  isError?: boolean; 
  isWarning?: boolean;
}
interface ToastPayload {
  message: string;
  isError?: boolean;
  isWarning?: boolean;
}

interface ToastState {
  messages: ToastMessage[];
}

const initialState: ToastState = {
  messages: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<ToastPayload>) {
      state.messages.push({ id: Date.now().toString() + Math.random().toString(36), message: action.payload.message, isError: action.payload.isError, isWarning: action.payload.isWarning });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter(t => t.id !== action.payload);
    },
    clearToasts(state) {
      state.messages = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
