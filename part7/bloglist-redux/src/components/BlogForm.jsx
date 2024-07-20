import { Button, Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    });
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#55AD9B',
        color: '#F1F8E8',
        margin: '2em',
        padding: '2em',
      }}
    >
      <form onSubmit={addBlog}>
        <Typography variant="h5">Add a blog</Typography>
        <br></br>
        <TextField
          variant="filled"
          fullWidth
          size="small"
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
          placeholder="Title"
          data-testid="title"
        ></TextField>
        <TextField
          fullWidth
          variant="filled"
          size="small"
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
          placeholder="Author"
          data-testid="author"
        ></TextField>
        <TextField
          fullWidth
          variant="filled"
          size="small"
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
          placeholder="URL"
          data-testid="url"
        ></TextField>
        <br></br>
        <br></br>
        <Button variant="contained" color="success" type="submit">
          Create
        </Button>
        <br></br>
      </form>
    </Card>
  );
};
