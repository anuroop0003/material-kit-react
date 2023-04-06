import { configureStore } from '@reduxjs/toolkit'
import profileFetch from './Slices/fetchProfile';

const store = configureStore({
  reducer: {
    profileData:  profileFetch
  },
})

export default store