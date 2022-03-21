import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../components/games/gamesSlice";
import playerReducer from "../components/players/playerSlice";
import userReducer from "../components/user/userSlice";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

const existingState = loadState();

export const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
    user: userReducer,
  },
  preloadedState: existingState,
});

store.subscribe(
  throttle(() => {
    saveState({
      game: store.getState().game,
      player: store.getState().player,
      user: store.getState().user,
    });
  }, 1000)
);
