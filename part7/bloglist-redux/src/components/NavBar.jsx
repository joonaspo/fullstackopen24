import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Link className="navLink" to="/">
        View blogs
      </Link>
      |
      <Link className="navLink" to="/users">
        View users
      </Link>
    </div>
  );
};

export default NavBar;
