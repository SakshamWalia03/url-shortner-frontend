import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Named export so api.js can do: import { store } from "../store/store"
// without hitting the circular dep that default-only exports can cause.
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
