import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import missionReducer from './missions/missionSlice';
import App from '../App';

const store = configureStore({
  reducer: {
    missions: missionReducer,
  },
});

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;
