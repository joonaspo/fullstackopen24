import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogsReducer';
import { Button, TextField, Typography } from '@mui/material';

const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleComment = async () => {
    const content = { content: comment };
    dispatch(addComment(id, content));
    setComment('');
  };
  return (
    <>
      <Typography>Add comment:</Typography>
      <TextField
        placeholder="Comment"
        fullWidth
        variant="filled"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        color="success"
        sx={{ float: 'right', marginTop: '1em' }}
        onClick={handleComment}
      >
        Send
      </Button>
    </>
  );
};

export default CommentForm;
