import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import Select from "react-select";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES);

  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: genre ? genre.value : null },
  });

  if (genresLoading || booksLoading) {
    return <>Loading...</>;
  }

  const genres = genresData.allBooks.map((book) => book.genres);
  const uniqueGenres = [...new Set(genres.flat())];

  const genreOptions = uniqueGenres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const clearFilter = () => {
    setGenre(null);
  };

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>books</h2>
      Filter by:
      <Select
        value={genre}
        options={genreOptions}
        onChange={(selectedOption) => setGenre(selectedOption)}
        placeholder="Select a genre"
      ></Select>
      <button onClick={clearFilter}>Remove filter</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
