"use client";
import { addToast, removeToast } from "@/store/toast/toastSlice";
import React, { memo, use, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.toast.messages);

  // Duration for each toast in ms
  const DURATION = 2500;
  if (!messages.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {messages.map((toast: any) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          duration={DURATION}
          isError={toast.isError}
          isWarning={toast.isWarning}
        />
      ))}
    </div>
  );

};


// ToastItem: handles its own timer and progress bar
const ToastItem: React.FC<{ id: string; message: string; duration: number; isError?: boolean; isWarning?: boolean }> = memo(({ id, message, duration, isError, isWarning }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(id));
    }, duration);
    return () => clearTimeout(timer);
  }, [dispatch, id, duration]);

  let progressColor = "bg-green-500 dark:bg-green-600";
  if (isError) progressColor = "bg-red-500 dark:bg-red-600";
  else if (isWarning) progressColor = "bg-yellow-400 dark:bg-yellow-500";

  return (
    <div className="flex flex-col bg-black text-white dark:bg-white dark:text-black pt-2 pb-1 rounded shadow-lg pointer-events-auto w-[320px] overflow-hidden justify-between items-start">
      <div className="px-4">{message}</div>
      <div id='progress' className={`animate-slide-in-left w-full h-1 mt-1 ${progressColor}`}></div>
      {
        <style jsx global>{`
        @keyframes slide-in-left {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 2.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
      }
    </div>
  );
});

export default Toast;
