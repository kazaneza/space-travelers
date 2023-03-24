import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
};

export const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setMissions: (state, action) => {
      state.missions = action.payload; // esli
    },
  },
});

export const { setMissions } = missionSlice.actions;

export const selectMissions = (state) => state.missions.missions;

export default missionSlice.reducer;
