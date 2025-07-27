import { AppStore, RootState } from "@/store/store";
import { clearErrors } from "./auth/authSlice";

let errorClearTimeout: NodeJS.Timeout | null = null;

export const errorWatcher = (store: AppStore) => {
  const state = store.getState();
  const errors = state.auth.errors;
  if (errors && Object.keys(errors).length > 0) {
    if (errorClearTimeout) clearTimeout(errorClearTimeout);
    errorClearTimeout = setTimeout(() => {
      store.dispatch(clearErrors());
    }, 5000);
  }
};
