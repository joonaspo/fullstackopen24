import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { successMessage, errorMessage } = notification;

  if (errorMessage === null && successMessage === null) {
    return null;
  }

  return (
    <div className={errorMessage ? 'error' : 'success'}>
      {errorMessage ? (
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      ) : (
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      )}
    </div>
  );
};
