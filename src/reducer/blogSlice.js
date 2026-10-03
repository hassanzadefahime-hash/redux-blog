import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";

const blogAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = blogAdapter.getInitialState({
  status: "idle",
  error: null,
});

// دریافت همه پست‌ها
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    const response = await axios.get(
      "http://localhost:9000/blogs"
    );

    return response.data;
  }
);

// افزودن پست
export const addNewBlog = createAsyncThunk(
  "blogs/addNewBlog",
  async (initialBlog) => {
    const response = await axios.post(
      "http://localhost:9000/blogs",
      initialBlog
    );

    return response.data;
  }
);

// حذف پست
export const deleteApiBlog = createAsyncThunk(
  "blogs/deleteApiBlog",
  async (blogId) => {
    await axios.delete(
      `http://localhost:9000/blogs/${blogId}`
    );

    return blogId;
  }
);

// ویرایش پست
export const updateApiBlog = createAsyncThunk(
  "blogs/updateApiBlog",
  async (updatedBlog) => {
    const response = await axios.put(
      `http://localhost:9000/blogs/${updatedBlog.id}`,
      updatedBlog
    );

    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",

  initialState,

  reducers: {
    blogAdded: {
      reducer(state, action) {
        blogAdapter.addOne(state, action.payload);
      },

      prepare(userId, title, content) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },

    blogUpdated: (state, action) => {
      const { id, title, content } = action.payload;

      const existingBlog = state.entities[id];

      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.content = content;
      }
    },

    blogDeleted: (state, action) => {
      blogAdapter.removeOne(state, action.payload);
    },

    reactionAdded: (state, action) => {
      const { id, reaction } = action.payload;

      const existingBlog = state.entities[id];

      if (existingBlog) {
        existingBlog.reactions[reaction] =
          Number(existingBlog.reactions[reaction]) + 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // دریافت پست‌ها
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "completed";
        state.error = null;

        blogAdapter.setAll(state, action.payload);
      })

      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // افزودن
      .addCase(addNewBlog.fulfilled, (state, action) => {
        blogAdapter.addOne(state, action.payload);
      })

      // حذف
      .addCase(deleteApiBlog.fulfilled, (state, action) => {
        blogAdapter.removeOne(state, action.payload);
      })

      // ویرایش
      .addCase(updateApiBlog.fulfilled, (state, action) => {
        blogAdapter.upsertOne(state, action.payload);
      });
  },
});

// Actions
export const {
  blogAdded,
  blogUpdated,
  blogDeleted,
  reactionAdded,
} = blogSlice.actions;

// Selectors
export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogAdapter.getSelectors(
  (state) => state.blogs
);

// پست‌های یک کاربر
export const selectUserBlog = createSelector(
  [
    selectAllBlogs,
    (_state, userId) => userId,
  ],
  (blogs, userId) =>
    blogs.filter((blog) => blog.user === userId)
);

export default blogSlice.reducer;