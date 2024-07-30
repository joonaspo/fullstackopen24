/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import Select from "react-select";
import { useState } from "react";

const Books = ({ show }) => {
  const [genreFilter, setGenreFilter] = useState(null);
  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES);

  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter ? genreFilter.value : null },
  });

  if (genresLoading || booksLoading) {
    return <>Loading...</>;
  }
  console.log(booksData);
  const genres = genresData.allBooks.map((book) => book.genres);
  const uniqueGenres = [...new Set(genres.flat())];

  const genreOptions = uniqueGenres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const clearFilter = () => {
    setGenreFilter(null);
  };

  // eslint-disable-next-line react/prop-types
  if (!show) {
    return null;
  }
  return (
    <div>
      <h2>books</h2>
      Filter by:
      <Select
        value={genreFilter}
        options={genreOptions}
        onChange={(selectedOption) => setGenreFilter(selectedOption)}
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
