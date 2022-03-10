import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSession = createAsyncThunk(
  "game/loadSession",
  async (input, thunkAPI) => {
    return null;
  }
);

export const gameOver = createAsyncThunk(
  "game/gameOver",
  async (input, thunkAPI) => {
    return null;
  }
);

const initialState = {
  venue: null,
  sessionStatus: { loggedIn: false, message: null },
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
        state.inPlay.length < state.venue.maxCourts
      ) {
        const game = state.queue.shift();
        state.inPlay.push(game);
      }
    },

    endSession: (state, action) => {
      state.venue = null;
      state.sessionStatus.loggedIn = false;
      state.queue = [];
      state.inPlay = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSession.pending, (state, action) => {
      state.sessionStatus.message = "Loading";
    });

    builder.addCase(loadSession.fulfilled, (state, action) => {
      state.venue = action.payload;
      state.sessionStatus.loggedIn = true;
    });

    builder.addCase(loadSession.rejected, (state, action) => {
      state.sessionStatus.message = "Authorization Failed";
    });

    builder.addCase(gameOver.fulfilled, (state, action) => {
      state.inPlay = state.inPlay.filter(
        (game) => game.id !== action.payload.id
      );
    });

    builder.addCase(gameOver.rejected, (state, action) => {
      state.pendingUpload.push(action.payload);
      state.inPlay = state.inPlay.filter(
        (game) => game.id !== action.payload.id
      );
    });
  },
});

export const { queueGame, gameOn, endSession } = gameSlice.actions;

export const selectVenue = (state) => state.game.venue;
export const selectSessionStatus = (state) => state.game.sessionStatus;
export const selectQueue = (state) => state.game.queue;
export const selectInPlay = (state) => state.game.inPlay;

export default gameSlice.reducer;
