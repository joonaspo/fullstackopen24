import { useState } from 'react'

export const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <h2>Add a blog</h2>
              Title: <input
        value={newBlogTitle}
        onChange={event => setNewBlogTitle(event.target.value)}
        placeholder='Title'
        data-testid='title'
      ></input><br></br>
      <br></br>
              Author: <input
        value={newBlogAuthor}
        onChange={event => setNewBlogAuthor(event.target.value)}
        placeholder='Author'
        data-testid='author'
      ></input><br></br>
      <br></br>
              Url: <input
        value={newBlogUrl}
        onChange={event => setNewBlogUrl(event.target.value)}
        placeholder='URL'
        data-testid='url'
      ></input><br></br>
      <br></br>
      <button type='submit'>Create</button>
    </form>
  )
}