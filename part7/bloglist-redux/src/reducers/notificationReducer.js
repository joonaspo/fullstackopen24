import { createSlice } from '@reduxjs/toolkit';

export const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    successMessage: null,
    errorMessage: null,
  },
  reducers: {
    successMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    errorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clear: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
});

export const setSuccessMessage = (payload) => (dispatch) => {
  dispatch(successMessage(payload));
  setTimeout(() => {
    dispatch(clear());
  }, 2500);
};
export const setErrorMessage = (payload) => (dispatch) => {
  dispatch(errorMessage(payload));
  setTimeout(() => {
    dispatch(clear());
  }, 2500);
};

export const { successMessage, errorMessage, clear } =
  notificationReducer.actions;

export default notificationReducer.reducer;
