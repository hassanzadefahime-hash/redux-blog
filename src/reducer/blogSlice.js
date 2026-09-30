import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
// import { sub } from "date-fns-jalali";
// import { fetchUsers } from "./userSlice";

// const initialState = {
//   blogs: [
//     {
//       id: nanoid(),
//       date: sub(new Date() , {minutes:10}).toISOString(),
//       title: "اولین پست",
//       content: "محتوای اولین پست",
//       user:"A4P3AouNmLYne6UZn-6xc",
//        reactions:{
//         thumbsUp:0,
//         hooray:0,
//         heart:0,
//         rocket:0,
//         eyes:0
//     }
//     },
//     {
//       id: nanoid(),
//       date: new Date().toISOString(),
//       title: "دومین پست",
//       content: "محتوای دومین پست ",
//       user:"A4P3AouNmLYne6UZn-6xc",
//       reactions:{
//         thumbsUp:0,
//         hooray:0,
//         heart:0,
//         rocket:0,
//         eyes:0
//     }
//     },
//   ],
// };

const blogAdapter = createEntityAdapter({
  sortComparer :(a,b)=>b.date.localeCompare(a.date)
})


const initialState = blogAdapter.getInitialState({
  status:"idle",
  error:[]
})


// const initialState = {
//   blogs: [],
//   status: "idle",
//   error: null,
// };

export const fetchblogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
  const responsive = await axios.get("http://localhost:9000/blogs");
  return responsive.data;
});

export const addNewBlog = createAsyncThunk(
  "/blofs/addNewBlog",
  async (initialBlog) => {
    const responsive = await axios.post(
      "http://localhost:9000/blogs",
      initialBlog,
    );
    return responsive.data;
  },
);

export const deleteApiBlog = createAsyncThunk(
  "/blogs/deleteApiBlog",
  async (initialId) => {
    await axios.delete(`http://localhost:9000/blogs/${initialId}`);
    return initialId;
  },
);

export const updateApiBlog = createAsyncThunk(
  "/blogs/updateApiBlog",
  async (initialBlog) => {
    const respone = await axios.put(
      `http://localhost:9000/blogs/${initialBlog.id}`,
      initialBlog,
    );
    return respone.data;
  },
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    blogAdded: {
      reducer(state, action) {
        state.blogs.push(action.payload);
      },
      prepare(userId, title, content) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        };
      },
    },
    blogUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      // const existBlog = state.blogs.find((blog) => blog.id === id);

      const existBlog = state.entities[id]
      if (existBlog) {
        existBlog.title = title;
        existBlog.content = content;
      }
    },
    blogDeleted: (state, action) => {
      const { id } = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
    },
    reactionAdded: (state, action) => {
      const { id, reaction } = action.payload;
      // const existBlog = state.blogs.find((blog) => blog.id === id);
      const existBlog = state.entities[id]
      if (existBlog) {
        existBlog.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchblogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchblogs.fulfilled, (state, action) => {
        ((state.status = "completed"),
        //  (state.blogs = action.payload)
        blogAdapter.upsertMany(state , action.payload)
        );
      })
      .addCase(fetchblogs.rejected, (state, action) => {
        ((state.status = "failed"), (state.error = action.error.message));
      })
      .addCase(addNewBlog.fulfilled , blogAdapter.addOne)
      // .addCase(addNewBlog.fulfilled, (state, action) => {
      //   // state.blogs.push(action.payload);
      //   blogAdapter.addOne(action.payload)
      // })
      // .addCase(deleteApiBlog.fulfilled, (state, action) => {
      //   state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      // })
      .addCase(deleteApiBlog.fulfilled , blogAdapter.removeOne)
      .addCase(updateApiBlog.fulfilled , blogAdapter.updateOne)
      // .addCase(updateApiBlog.fulfilled, (state, action) => {
        
        
      //   const updatedBlogIndex = state.blogs.findIndex(
      //     (blog) => blog.id ===action.payload.id,
      //   );
      //   state.blogs[updatedBlogIndex] = action.payload;
      // });
  },
});

// export const selectAllBlogs = (state) => state.blogs.blogs;

// export const selectBlogById = (state, blogId) =>
//   state.blogs.blogs.find((blog) => blog.id === blogId);

export const {
  selectAll:selectAllBlogs,
  selectById:selectBlogById,
  selectIds:selectBlogIds
} = blogAdapter.getSelectors(state => state.blogs)


export const selectUserBlog = createSelector(
  [selectAllBlogs , (state , userId)=>userId],
  (blogs , userId)=>blogs.filter(blog => blog.user === userId)
)

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
  blogSlice.actions;
export default blogSlice.reducer;
