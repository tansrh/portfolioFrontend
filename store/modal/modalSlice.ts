import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    content: null as React.ReactNode | null,
    showYesButton: false,
    showCancelButton: false,
    onYesClick: null as (() => void) | null,
    onCancelClick: null as (() => void) | null,
    yesButtonText: "Yes",
    cancelButtonText: "Cancel",
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openModal: (state, action) => {
            state.isOpen = true;
            state.content = action.payload.content;
            state.showYesButton = action.payload.showYesButton;
            state.showCancelButton = action.payload.showCancelButton || false;
            state.onYesClick = action.payload.onYesClick || null;
            state.onCancelClick = action.payload.onCancelClick || null;
            state.yesButtonText = action.payload.yesButtonText || "Yes";
            state.cancelButtonText = action.payload.cancelButtonText || "Cancel";
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.content = null;
            state.showYesButton = false;
            state.showCancelButton = false;
            state.onYesClick = null;
            state.onCancelClick = null;
            state.yesButtonText = "Yes";
            state.cancelButtonText = "Cancel";
        },
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;