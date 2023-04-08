import { configureStore } from '@reduxjs/toolkit';
import profileFetch from './Slices/fetchProfile';
import snackbarSlice from './Slices/snackbarSlice';

const store = configureStore({
  reducer: {
    profileData: profileFetch,
    showSnackbar: snackbarSlice,
  },
});

export default store;
