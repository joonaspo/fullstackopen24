import PropTypes from 'prop-types'

export const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <input
          placeholder='username'
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        /> Username
      </label>
      <br/>
      <label>
        <input
          placeholder='password'
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        /> Password
      </label>
      <br/>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}