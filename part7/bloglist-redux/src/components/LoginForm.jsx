import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <input
          placeholder="username"
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </label>
      <br />
      <label>
        <input
          placeholder="password"
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <br />
      <Button variant="contained" color="success" type="submit">
        login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
