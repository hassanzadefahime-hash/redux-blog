import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { apiSlice } from "../api/apiSlice";

// const initialState = [
//   {
//     id: nanoid(),
//     fullname: "فهیمه",
//   },
//   { id: nanoid(), fullname: "فرزاد" },
// ];

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
        query: () => "/users"
        , transformResponse: responseData => {
          return usersAdapter.setAll(initialState, responseData)
        },
        providesTags:["USER"]
      }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      })
      , invalidatesTags: ["USER"]
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE"
      })
      , invalidatesTags: ["USER"]
    })
  })
})


export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
const emptyUser = []


// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult?.data ?? emptyUser
// )

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (userId , state)=>userId,
//   (userId , users) => users.find(user => user.id === userId)

//   )



// export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
//   const response = await axios.get("http://localhost:9000/users");
//   return response.data;
// });

// export const addasyncUser = createAsyncThunk(
//   "/users/addasyncUser",
//   async (initialUser) => {
//     const response = await axios.post(
//       `http://localhost:9000/users`,
//       initialUser,
//     );
//     return response.data;
//   },
// );

// export const deleteApiUser = createAsyncThunk(
//   "/users/deleteUser",
//   async (userId) => {
//     await axios.delete(`http://localhost:9000/users/${userId}`);
//     return userId;
//   },
// );

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  //     .addCase(addasyncUser.fulfilled, usersAdapter.addOne)
  //     .addCase(deleteApiUser.fulfilled, usersAdapter.removeOne);
  // },
});

const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data)

export const {
  selectAll: AllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)


// export const AllUsers = (state) => state.users;

// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

export const { useGetUsersQuery, useAddNewUserMutation, useDeleteUserMutation } = extendedApiSlice

export default userSlice.reducer;
