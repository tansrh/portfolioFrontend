import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { setToastMessage } from "./toast/toastMsgSlice";

export const toastLoggerMiddleware: Middleware = store => next => (action: any) => {
  if (action.type === setToastMessage.type) {
    console.log("setToastMessage dispatched with payload:", action.payload);
  }
  return next(action);
};