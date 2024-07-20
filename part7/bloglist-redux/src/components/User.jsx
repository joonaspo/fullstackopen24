import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getViewedUser } from '../reducers/userReducer';

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.user.viewedUser);
  const blogs = useSelector((state) => state.blogs.blogs);
  const usersBlogs = blogs.filter((blog) => blog.user !== id);

  useEffect(() => {
    dispatch(getViewedUser(id));
  }, [dispatch, id]);

  if (!user) {
    return null;
  }

  if (blogs.length === 0) {
    return <p>{user.name} has no blogs!</p>;
  }

  return (
    <>
      <h3>{user.name}</h3>
      <p>Blogs:</p>
      <ul>
        {usersBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
