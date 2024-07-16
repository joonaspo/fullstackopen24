import { Togglable } from './Togglable'

const Blog = ({ blog, handleDelete, likedBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = (id) => {
    likedBlog(id,{
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    })
  }

  return (
    <div
      style={blogStyle}
      className='blog'
    >
      {blog.title} by {blog.author}
      <Togglable buttonLabel='View more'>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>{blog.likes} Like(s)</p>
        {user && (
          <button onClick={() => handleLike(blog.id)}>Like</button>
        )}
        <br/>
        <br/>
        {user && user.username === blog.user.username &&
        <button onClick={() => handleDelete(blog.id, blog.title)}>Delete</button>
        }
        <br/>
        <br/>
        <p>Added by: {blog.user.name}</p>
      </Togglable>
    </div>
  )
}

export default Blog