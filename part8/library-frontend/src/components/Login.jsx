import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

// eslint-disable-next-line react/prop-types
const Login = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      console.log(
        `token from localStorage: ${localStorage.getItem("library-user-token")}`
      );
      setPage("authors");
    }
  }, [result.data, setPage, setToken]);

  if (!show) {
    return null;
  }
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logged in");
    login({ variables: { username, password } });
  };
  return (
    <form onSubmit={handleLogin}>
      <label>Username</label>
      <br />
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      ></input>
      <br />
      <label>Password</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      ></input>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
