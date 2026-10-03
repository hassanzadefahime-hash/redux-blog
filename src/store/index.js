import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
reducer: {
users: userReducer,
[apiSlice.reducerPath]: apiSlice.reducer,
},

middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(apiSlice.middleware),
});
