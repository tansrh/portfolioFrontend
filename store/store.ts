import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import toastReducer from "./toast/toastSlice";
import portfolioReducer from "./portfolio/portfolioSlice";
import blogsReducer from "./blogs/blogsSlice";
import modalReducer from "./modal/modalSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { toastLoggerMiddleware } from "./loggerMiddleware";
import { errorWatcher } from "@/store/watchers";
import { api } from "./services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const appReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  portfolio: portfolioReducer,
  blogs: blogsReducer,
  modal: modalReducer,
  [api.reducerPath]: api.reducer,
});
const rootReducer = (state: any, action: any) => {
  if (action.type === "resetStore") {
    state = {}; 
  }
  return appReducer(state, action);
};
const store = configureStore({
  // reducer: {
  //   auth: authReducer,
  //   toast: toastReducer,
  //   portfolio: portfolioReducer,
  //   blogs: blogsReducer,
  //   modal: modalReducer,
  //   [api.reducerPath]: api.reducer,
  // },
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(toastLoggerMiddleware).concat(api.middleware),
});
setupListeners(store.dispatch);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

store.subscribe(() => {
  errorWatcher(store);
});

export default store;
