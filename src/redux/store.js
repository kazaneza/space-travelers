import { configureStore } from '@reduxjs/toolkit';
import RocketSlice from './features/rockets/RocketSlice';
import missionReducer from './features/missions/missionSlice';

const store = configureStore({
  reducer: {
    rocket: RocketSlice,
    missions: missionReducer,

  },
});

export default store;
