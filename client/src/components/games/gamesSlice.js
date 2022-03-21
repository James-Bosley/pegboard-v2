import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSession = createAsyncThunk(
  "game/loadSession",
  async (input, thunkAPI) => {
    const response = await fetch(`/v1/session/activate/${input}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_active: true }),
    });
    if (response !== 500) {
      const session = await response.json();
      return session;
    }
    return input.id;
  }
);

export const gameOver = createAsyncThunk(
  "game/gameOver",
  async (input, thunkAPI) => {
    const response = await fetch(`/v1/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const game = await response.json();
    return game;
  }
);

export const endSession = createAsyncThunk(
  "game/endSession",
  async (input, thunkAPI) => {
    const response = await fetch(`/v1/session/activate/${input}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_active: false }),
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
);

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
        game.time_started = JSON.stringify(new Date());
        game.game_status = "in play";
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
