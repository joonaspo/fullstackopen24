import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import { BlogForm } from './components/BlogForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      console.log(blogs)
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername(username)
      setPassword(password)

    } catch (exception) {
      console.error('wrong credentials')
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      console.log(updatedBlogs)
      setBlogs(updatedBlogs)
      await setSuccessMessage(`Successfully added blog "${blogObject.title}" to list`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)
      setErrorMessage(
        `Failed to add blog "${blogObject.title}" to list`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }

  const deleteBlog = async (id, title) => {
    try {
      if (window.confirm(`Delete ${title}?`)) {
        blogService
          .deleteThis(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSuccessMessage(
          'Successfully removed blog from the list'
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }
    } catch (error) {
      setErrorMessage('Failed to remove blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addLike = async (id, likedBlog) => {
    try {
      await blogService.update(id,likedBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      setErrorMessage('Failed to like the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {!user &&
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        >
        </LoginForm>
      </Togglable>}
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      ></Notification>
      {user && <div>Logged in as: {user.name} <button onClick={logOut}>Log out</button></div>}
      {user &&
      <Togglable buttonLabel='Create post'>
        <BlogForm createBlog={addBlog}
        >
        </BlogForm>
      </Togglable>
      }
      <h2>blogs</h2>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleDelete={deleteBlog} likedBlog={addLike} user={user}/>
        )}
    </div>
  )
}

export default App