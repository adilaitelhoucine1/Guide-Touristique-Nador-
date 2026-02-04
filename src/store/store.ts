import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import placesReducer from './slices/placesSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    places : placesReducer
  },
});

export default store;