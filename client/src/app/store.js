import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../components/games/gamesSlice';
import playerReducer from '../components/players/playerSlice';
import userReducer from '../components/user/userSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    player: playerReducer,
    user: userReducer
  },
});
