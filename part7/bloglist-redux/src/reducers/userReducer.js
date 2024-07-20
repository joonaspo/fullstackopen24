import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/users';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    viewedUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setViewedUser: (state, action) => {
      state.viewedUser = action.payload;
    },
  },
});

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    await blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser');
    dispatch(setUser(null));
  };
};

export const checkForLogin = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      await blogService.setToken(user.token);
      dispatch(setUser(user));
    } else {
      setUser(null);
    }
  };
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(setAllUsers(users));
  };
};

export const getViewedUser = (id) => {
  return async (dispatch) => {
    const user = await userService.getUserById(id);
    dispatch(setViewedUser(user));
  };
};

export const { setUser, setAllUsers, setViewedUser } = userReducer.actions;
export default userReducer.reducer;
