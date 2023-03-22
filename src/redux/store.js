import { configureStore } from '@reduxjs/toolkit';
import RocketSlice from './features/rockets/RocketSlice';

const store = configureStore({
  reducer: {
    rocket: RocketSlice,
  },
});

export default store;
