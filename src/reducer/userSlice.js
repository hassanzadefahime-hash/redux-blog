import {
  createEntityAdapter,
  createSelector,
  createSlice,
  } from "@reduxjs/toolkit";
  
  import { apiSlice } from "../../api/apiSlice";
  
  const usersAdapter = createEntityAdapter();
  
  const initialState = usersAdapter.getInitialState();
  
  export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  getUsers: builder.query({
  query: () => "/users",
  
  
    transformResponse: (responseData) => {
      return usersAdapter.setAll(initialState, responseData);
    },
  
    providesTags: ["USER"],
  }),
  
  addNewUser: builder.mutation({
    query: (user) => ({
      url: "/users",
      method: "POST",
      body: user,
    }),
  
    invalidatesTags: ["USER"],
  }),
  
  deleteUser: builder.mutation({
    query: (userId) => ({
      url: `/users/${userId}`,
      method: "DELETE",
    }),
  
    invalidatesTags: ["USER"],
  }),
  
  
  }),
  });
  
  export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  } = extendedApiSlice;
  
  // دریافت نتیجه getUsers از RTK Query
  export const selectUsersResult =
  extendedApiSlice.endpoints.getUsers.select();
  
  // دریافت entity state کاربران
  export const selectUsersData = createSelector(
  selectUsersResult,
  (result) => result.data ?? initialState
  );
  
  // ساخت selectorهای Entity Adapter
  const userSelectors = usersAdapter.getSelectors(
  (state) => selectUsersData(state)
  );
  
  export const AllUsers = userSelectors.selectAll;
  export const selectUserById = userSelectors.selectById;
  export const selectUserIds = userSelectors.selectIds;
  
  // Reducer خالی فقط برای سازگاری فعلی Store
  const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  });
  
  export default userSlice.reducer;
  