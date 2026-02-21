import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";

export function store() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}

export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
