import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import toastReducer from "./toast/toastSlice";
import { useDispatch } from "react-redux";
import { toastLoggerMiddleware } from "./loggerMiddleware";
import { errorWatcher } from "@/store/watchers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    // add other slices here
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(toastLoggerMiddleware),
});
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

store.subscribe(() => {
  errorWatcher(store);
});

export default store;
