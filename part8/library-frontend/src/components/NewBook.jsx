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

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [setBornTo, setBorn] = useState("");
  const result = useQuery(AUTHOR_OPTIONS);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
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

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    createBook({ variables: { title, author, published, genres } });
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
    editAuthor({ variables: { name: author, setBornTo: Number(setBornTo) } });
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
      <br />
      <form onSubmit={edit}>
        <Select
          options={names}
          onChange={(target) => setAuthor(target.value)}
        />
        <input
          type="number"
          defaultValue={names[0]}
          value={setBornTo}
          onChange={({ target }) => setBorn(target.value)}
        ></input>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default NewBook;
