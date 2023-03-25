import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://api.spacexdata.com/v3/rockets';

const initialState = {
  loading: false,
  rockets: [],
  error: '',
};

export const fetchData = createAsyncThunk('rockets/fetchData', async () => {
  try {
    const response = await axios.get(URL);
    return response.data.map((rocket) => ({
      ...rocket,
      reserved: JSON.parse(localStorage.getItem(rocket.id)) || false,
    }));
  } catch (error) {
    return error.message;
  }
});

export const reserveRocket = createAsyncThunk('rockets/reserveRocket', async (id) => {
  try {
    localStorage.setItem(id, true);
    return id;
  } catch (error) {
    return error.message;
  }
});

export const cancelRocket = createAsyncThunk('rockets/cancelRocket', async (id) => {
  try {
    localStorage.removeItem(id);
    return id;
  } catch (error) {
    return error.message;
  }
});

const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.rockets = action.payload;
        state.error = '';
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.rockets = [];
        state.error = action.error.message;
      })
      .addCase(reserveRocket.fulfilled, (state, action) => {
        state.rockets = state.rockets.map((rocket) => {
          if (rocket.id === action.payload) {
            return {
              ...rocket,
              reserved: true,
            };
          }
          return rocket;
        });
      })
      .addCase(cancelRocket.fulfilled, (state, action) => {
        state.rockets = state.rockets.map((rocket) => {
          if (rocket.id === action.payload) {
            return {
              ...rocket,
              reserved: false,
            };
          }
          return rocket;
        });
      });
  },
});

export default rocketSlice.reducer;
