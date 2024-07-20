import { useState, useEffect } from 'react';
import { Notification } from './components/Notification';
import { LoginForm } from './components/LoginForm';
import { Togglable } from './components/Togglable';
import { BlogForm } from './components/BlogForm';
import {
  setErrorMessage,
  setSuccessMessage,
} from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, addBlog, addLike } from './reducers/blogsReducer';
import { checkForLogin, login, logout } from './reducers/userReducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import BlogList from './components/Bloglist';
import User from './components/User';
import Blog from './components/Blog';
import NavBar from './components/NavBar';
import './app.css';
import { Button, Typography } from '@mui/material';
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(checkForLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
      dispatch(setSuccessMessage('Succesfully logged in!'));
    } catch (exception) {
      dispatch(setErrorMessage('Incorrect username or password!'));
    }
  };

  const handleCreate = async (blogObject) => {
    try {
      await dispatch(addBlog(blogObject));
      dispatch(
        setSuccessMessage(
          `Successfully added blog "${blogObject.title}" to list`
        )
      );
    } catch ({ response }) {
      dispatch(
        setErrorMessage(`Failed to add blog "${blogObject.title}" to list: ${response.data.error}!
          `)
      );
    }
  };

  const handleLike = async (id, likedBlog) => {
    try {
      await dispatch(addLike(id, likedBlog));
      dispatch(setSuccessMessage(`Liked ${likedBlog.title}`));
    } catch (error) {
      dispatch(setErrorMessage('Failed to like the blog'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <div className="mainElement">
        <div className="navBar">
          {!user && (
            <Togglable buttonLabel="login">
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              ></LoginForm>
            </Togglable>
          )}
          {user && (
            <div>
              <Typography variant="h5">
                {' '}
                Logged in as: {user.name}{' '}
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Log out
                </Button>{' '}
              </Typography>
            </div>
          )}
        </div>
        <div className="upperElement">
          <NavBar />
          <Notification />
          <br />
          <br />
          {user && (
            <Togglable buttonLabel="Create post">
              <BlogForm createBlog={handleCreate}></BlogForm>
            </Togglable>
          )}
        </div>
        <br />
      </div>
      <Routes>
        <Route path="/" element={<BlogList />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<User />}></Route>
        <Route
          path="/blogs/:id"
          element={<Blog likedBlog={handleLike} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
