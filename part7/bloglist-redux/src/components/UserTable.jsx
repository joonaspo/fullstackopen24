import { Link } from 'react-router-dom';

const UserTable = ({ user, cellStyle }) => {
  return (
    <tr>
      <td scope="row" style={cellStyle}>
        <Link to={`/users/${user.id}`}> {user.name}</Link>
      </td>
      <td style={cellStyle}>{user.blogs.length}</td>
    </tr>
  );
};

export default UserTable;
