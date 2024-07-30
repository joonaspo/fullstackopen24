import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import { updateCache } from "./utils";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    const loggedUser = localStorage.getItem("library-user-token");
    if (loggedUser) {
      setToken(loggedUser);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
      const addedBook = data.data.bookAdded;
      console.log(addedBook);
      window.alert(`${addedBook.title} added!`);
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        addedBook
      );
    },
  });

  const logOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logOut}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login setToken={setToken} show={page === "login"} setPage={setPage} />

      <Recommendations show={page === "recommended"}></Recommendations>
    </div>
  );
};

export default App;
