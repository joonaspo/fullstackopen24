/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  AUTHOR_OPTIONS,
  CREATE_BOOK,
  EDIT_AUTHOR,
} from "../queries";
import Select from "react-select";
import { updateCache } from "../utils";

const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [bornTo, setBornTo] = useState("");
  const result = useQuery(AUTHOR_OPTIONS);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(
        cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        response.data.addBook
      );
    },
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <>Loading...</>;
  }

  const names = result.data.allAuthors.map(({ name }) => ({
    value: name,
    label: name,
  }));

  // eslint-disable-next-line react/prop-types
  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  const edit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name: author, setBornTo: Number(bornTo) } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
      <h3>edit author birth date</h3>
      <form onSubmit={edit}>
        <Select
          options={names}
          onChange={(target) => setAuthor(target.value)}
        />
        <input
          type="number"
          value={bornTo}
          onChange={({ target }) => setBornTo(target.value)}
        ></input>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default NewBook;
