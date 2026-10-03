
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  tagTypes: ["BLOG", "USER", "GROUP"],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: (result = []) => [
        "BLOG",
        ...result.map(({ id }) => ({
          type: "BLOG",
          id,
        })),
      ],
    }),

    getBlog: builder.query({
      query: (initialBlogId) => `/blogs/${initialBlogId}`,
      providesTags: (result, error, arg) => [
        {
          type: "BLOG",
          id: arg,
        },
      ],
    }),

    addNewBlog: builder.mutation({
      query: (initialBlog) => ({
        url: "/blogs",
        method: "POST",
        body: initialBlog,
      }),
      invalidatesTags: ["BLOG"],
    }),

    editBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog.id}`,
        method: "PUT",
        body: blog,
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "BLOG",
          id: arg.id,
        },
      ],
    }),

    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BLOG"],
    }),

    addReaction: builder.mutation({
      query: ({ blogId, reactionData }) => ({
        url: `/blogs/${blogId}`,
        method: "PATCH",
        body: {
          reactions: reactionData,
        },
      }),
      invalidatesTags: ["BLOG"],
    }),

    getGroups: builder.query({
      query: () => "/groups",
      providesTags: (result = []) => [
        "GROUP",
        ...result.map(({ id }) => ({
          type: "GROUP",
          id,
        })),
      ],
    }),

    getGroup: builder.query({
      query: (initialGroupId) => `/groups/${initialGroupId}`,
      providesTags: (result, error, arg) => [
        {
          type: "GROUP",
          id: arg,
        },
      ],
    }),
  }),
});

export const {
  useGetGroupQuery,
  useGetGroupsQuery,
  useAddReactionMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddNewBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = apiSlice;

