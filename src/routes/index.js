import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

import blogReducer from "../features/blog/blogSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});