import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, initializeBlogs } from '../reducers/blogsReducer';
import CommentForm from './CommentForm';
import {
  setErrorMessage,
  setSuccessMessage,
} from '../reducers/notificationReducer';
import { Button, Card, Typography } from '@mui/material';

const Blog = ({ likedBlog }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs.blogs);
  const user = useSelector((state) => state.user.user);

  const blog = blogs.find((blog) => blog.id === id);

  const handleDelete = async (id, title) => {
    try {
      if (window.confirm(`Delete ${title}?`)) {
        await dispatch(deleteBlog(id));
        dispatch(setSuccessMessage('Successfully removed blog from the list'));
        navigate('/');
      }
    } catch (error) {
      dispatch(setErrorMessage('Failed to remove blog'));
    }
  };

  const handleLike = async (id) => {
    await likedBlog(id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    });
  };
  if (!blog || !user) {
    return null;
  }

  console.log(blog.user.username);
  return (
    <Card
      className="blog"
      sx={{
        backgroundColor: '#95d2b3',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
        marginLeft: '25%',
      }}
    >
      <br />
      <Typography>
        {blog.title} by {blog.author}
      </Typography>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p>{blog.author}</p>
      <p>{blog.likes} Like(s)</p>
      {user && (
        <Button
          onClick={() => handleLike(blog.id)}
          variant="contained"
          color="success"
          sx={{ width: '15%' }}
        >
          Like
        </Button>
      )}
      <br />
      {user && user.username === blog.user.username && (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(blog.id, blog.title)}
        >
          Delete
        </Button>
      )}
      <br />
      <p>Added by: {blog.user.name}</p>
      <Card
        sx={{
          width: '80%',
          justifyContent: 'center',
          backgroundColor: '#55AD9B',
          margin: '2em',
          padding: '2em',
          color: '#f1f8e8',
        }}
      >
        <Typography variant="h5">Comments</Typography>
        <CommentForm id={blog.id}></CommentForm>
        <br />
        {blog.comments.map((c, i) => (
          <p key={i}>{c.content}</p>
        ))}
        <br />
      </Card>
    </Card>
  );
};

export default Blog;
