import { createSlice } from "@reduxjs/toolkit";
import {
  loadSession,
  gameOver,
  endSession,
} from "../../util/asyncGamesActions";

const initialState = {
  sessionStatus: {
    active: false,
    message: null,
    id: null,
    name: null,
    courts: 0,
  },
  queue: [],
  inPlay: [],
  pendingUpload: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    queueGame: (state, action) => {
      state.queue.push(action.payload);
    },

    gameOn: (state) => {
      if (
        state.queue.length > 0 &&
        state.inPlay.length < state.sessionStatus.courts
      ) {
        const game = state.queue.shift();
        game.time_started = new Date().toJSON();
        state.inPlay.push(game);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSession.pending, (state, action) => {
      state.sessionStatus.message = "Loading";
    });

    builder.addCase(loadSession.fulfilled, (state, action) => {
      if (action.payload !== 500) {
        state.sessionStatus.active = true;
        state.sessionStatus.name = action.payload.name;
        state.sessionStatus.id = action.payload.id;
        state.sessionStatus.courts = action.payload.courts;
        state.sessionStatus.club_name = action.payload.club_name;
      } else {
        state.sessionStatus.message = "Server Error";
      }
    });

    builder.addCase(loadSession.rejected, (state, action) => {
      state.sessionStatus.message = "Authorization Failed";
    });

    builder.addCase(gameOver.fulfilled, (state, action) => {
      state.inPlay = state.inPlay.filter((game) => game.id !== action.payload);
    });

    builder.addCase(gameOver.rejected, (state, action) => {
      const game = state.inPlay.filter((game) => game.id === action.payload)[0];
      state.pendingUpload.push(game);
      state.inPlay = state.inPlay.filter((game) => game.id !== action.payload);
    });

    builder.addCase(endSession.fulfilled, (state, action) => {
      state.sessionStatus.active = false;
      state.sessionStatus.name = null;
      state.sessionStatus.id = null;
      state.sessionStatus.courts = 0;
      state.queue = [];
      state.inPlay = [];
    });
  },
});

export const { queueGame, gameOn } = gameSlice.actions;

export const selectSessionStatus = (state) => state.game.sessionStatus;
export const selectQueue = (state) => state.game.queue;
export const selectInPlay = (state) => state.game.inPlay;

export default gameSlice.reducer;
