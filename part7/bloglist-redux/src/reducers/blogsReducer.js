import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const blogsReducer = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    appendBlogs: (state, action) => {
      state.blogs = [...state.blogs, action.payload];
    },
    filterBlogs: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    updateBlogs: (state, action) => {
      const updatedBlog = action.payload;
      state.blogs = state.blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlogs(newBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteThis(id);
    dispatch(filterBlogs(id));
  };
};

export const addLike = (id, blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blogObject);
    console.log(updatedBlog);
    await dispatch(updateBlogs(updatedBlog));
  };
};

export const addComment = (id, content) => {
  return async (dispatch) => {
    const blog = await blogService.createComment(id, content);
    dispatch(updateBlogs(blog));
  };
};

export const { setBlogs, updateBlogs, filterBlogs, appendBlogs } =
  blogsReducer.actions;
export default blogsReducer.reducer;
