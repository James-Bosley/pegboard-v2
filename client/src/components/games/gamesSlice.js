import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadVenue = createAsyncThunk(
  'game/loadVenue',
  async (input, thunkAPI) => {
    return null;
  }
);

export const gameOver = createAsyncThunk(
  'game/gameOver',
  async (input, thunkAPI) => {
    return null;
  }
);

const initialState = {
  venue: null,
  venueStatus: { loggedIn: false, message: null },
  queue: [],
  inPlay: [],
  pendingUpload: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {

    queueGame: (state, action) => {
      state.queue.push(action.payload);
    },

    gameOn: (state) => {
      if(state.queue.length > 0 && state.inPlay.length < state.venue.maxCourts) {
        const game = state.queue.shift();
        state.inPlay.push(game);
      }
    },

    removeVenue: (state, action) => {
      state.venue = null;
      state.venueStatus.loggedIn = false;
      state.queue = [];
      state.inPlay = [];
    }
  },
  extraReducers: (builder) => {

    builder.addCase(loadVenue.pending , (state, action) => {
      state.venueStatus.message = 'Loading';
    });

    builder.addCase(loadVenue.fulfilled , (state, action) => {
      state.venue = action.payload;
      state.venueStatus.loggedIn = true;
    });

    builder.addCase(loadVenue.rejected , (state, action) => {
      state.venueStatus.message = 'Authorization Failed';
    });

    builder.addCase(gameOver.fulfilled , (state, action) => {
      state.inPlay = state.inPlay.filter(game => game.id !== action.payload.id);
    });

    builder.addCase(gameOver.rejected , (state, action) => {
      state.pendingUpload.push(action.payload);
      state.inPlay = state.inPlay.filter(game => game.id !== action.payload.id);
    });
  }
});

export const { queueGame, gameOn, removeVenue } = gameSlice.actions;

export const selectVenue = state => state.game.venue;
export const selectVenueStatus = state => state.game.venueStatus;
export const selectQueue = state => state.game.queue;
export const selectInPlay = state => state.game.inPlay;

export default gameSlice.reducer;
