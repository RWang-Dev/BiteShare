import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./slices/createProfile";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
