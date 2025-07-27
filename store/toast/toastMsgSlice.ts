import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string | null;
}

const initialState: ToastState = {
  message: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastMessage(state, action: PayloadAction<string | null>) {
      state.message = action.payload;
    },
  },
});

export const { setToastMessage } = toastSlice.actions;
export default toastSlice.reducer;
