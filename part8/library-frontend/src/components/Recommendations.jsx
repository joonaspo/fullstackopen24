import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Recommendations = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const { loading: userLoading, data: userData } = useQuery(ME);
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre ? favoriteGenre : null },
  });
  useEffect(() => {
    if (userData && userData.me) {
      setFavoriteGenre(userData.me.favoriteGenre);
    }
  }, [userData]);
  if (userLoading || booksLoading) {
    return <>Loading recommendations</>;
  }

  if (!show) {
    return null;
  }
  return (
    <div>
      {userData.me && (
        <>
          <p>
            Books in your favorite genre: <b>{userData.me.favoriteGenre}</b>
          </p>
          <ul>
            {booksData.allBooks.map((a) => (
              <li key={a.title}>{a.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Recommendations;
