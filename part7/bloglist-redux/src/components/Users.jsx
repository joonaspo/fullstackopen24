import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/userReducer';
import { useEffect } from 'react';
import UserTable from './UserTable';

const Users = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const tableStyle = {
    borderCollapse: 'collapse',
    border: '2px solid rgb(140, 140, 140)',
    fontFamily: 'sans-serif',
    fontSize: '0.8rem',
    letterSpacing: '1px',
  };

  const cellStyle = {
    border: '1px solid rgb(160, 160, 160)',
    padding: '8px 10px',
  };

  if (users.length === 0) {
    return <div>Loading users...</div>;
  }
  return (
    <table style={tableStyle}>
      <caption>Users</caption>
      <thead>
        <tr style={cellStyle}>
          <th scope="col" style={cellStyle}>
            User
          </th>
          <th scope="col" style={cellStyle}>
            Blogs
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserTable key={user.id} user={user} cellStyle={cellStyle} />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
