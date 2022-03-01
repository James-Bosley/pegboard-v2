import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../components/games/gamesSlice';
import playerReducer from '../components/players/playerSlice';
import userReducer from '../components/user/userSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
    user: userReducer
  }
});
