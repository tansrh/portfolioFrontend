'use client';

import React from "react";
import { useSelector } from "react-redux";
import FormButton from "../common/FormButton";
import { RootState, useAppDispatch } from "@/store/store";
import { closeModal } from "@/store/modal/modalSlice";
import ModalTextContent from "./ModalTextContent";
import PublicBlog from "@/components/U/PublicBlog";


const componentMap: Record<string, React.ComponentType<any>> = {
    ModalTextContent,
    PublicBlog
};
const Modal: React.FC = () => {
    const modalState: any = useSelector((store: RootState) => store.modal); // Adjust type as needed
    const {
        isOpen,
        content,
        showYesButton,
        showCancelButton,
        onYesClick,
        onCancelClick,
    } = modalState;
    const dispatch = useAppDispatch();
    const yesButtonText = (modalState as any).yesButtonText || "Yes";
    const cancelButtonText = (modalState as any).cancelButtonText || "Cancel";
    if (!isOpen) return null;
    const handleCancel = () => {
        onCancelClick?.();
        dispatch(closeModal());
    }
    const handleYes = () => {
        onYesClick?.();
        dispatch(closeModal());
    }

    const ContentComponent = content ? componentMap[content.component] : null;
    let componentWithProps;
    if (ContentComponent) {
        componentWithProps = <ContentComponent {...content.props} />;
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity"
                onClick={handleCancel}
                aria-label="Close modal overlay"
            />

            <div
                className="relative bg-white dark:bg-neutral-900 rounded-lg shadow-lg min-w-[400px] max-h-screen flex flex-col items-stretch z-10"
                role="dialog"
                aria-modal="true"
            >
                <button
                    className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 rounded-full z-10 p-1 transition focus:outline-none hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white cursor-pointer"
                    onClick={handleCancel}
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex-1 p-6 overflow-auto mt-4 justify-center items-center">{componentWithProps}</div>
                {(showYesButton || showCancelButton) && (
                    <div className="flex justify-end gap-4 px-6 pb-6">
                        {showYesButton && (
                            <FormButton type="button" onClick={handleYes}>{yesButtonText}</FormButton>
                        )}
                        {showCancelButton && (
                            <FormButton type="button" onClick={handleCancel}>{cancelButtonText}</FormButton>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
