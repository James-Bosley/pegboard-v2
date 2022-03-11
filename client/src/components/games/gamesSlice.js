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
    return false;
  }
);

export const gameOver = createAsyncThunk(
  "game/gameOver",
  async (input, thunkAPI) => {
    return null;
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
        console.log(action.payload);
        state.sessionStatus.active = true;
        state.sessionStatus.name = action.payload.name;
        state.sessionStatus.id = action.payload.id;
        state.sessionStatus.courts = action.payload.courts;
      } else {
        state.sessionStatus.message = "Server Error";
      }
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
