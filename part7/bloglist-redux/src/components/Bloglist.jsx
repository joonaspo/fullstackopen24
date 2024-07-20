import { Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../app.css';
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const padding = {
    padding: 5,
  };

  return (
    <div className="blogList">
      <Typography variant="h5">blogs</Typography>
      {sortedBlogs.map((blog) => (
        <div key={blog.id} className="blogListItem">
          <Link to={`/blogs/${blog.id}`} className="blogLink">
            {blog.title} by {blog.author}
            <br />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
