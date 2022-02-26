import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venue: null,
  queue: [],
  inPlay: []
};

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    loadVenueInfo: (state, action) => {
      //LOAD FROM API SITE SPECIFIC INFO
    },
    editVenueInfo: (state, action) => {
      state.maxCourts = action.payload;
      //PUT NEW SITE INFO TO API
    },
    createVenue: (state, action) => {
      //POST NEW SITE TO API
    },
    queueGame: (state, action) => {
      state.queue.push(action.payload);
    },
    gameOn: (state) => {
      if(state.queue.length > 0 && state.inPlay.length < state.maxCourts) {
        const game = state.waiting.shift();
        state.inPlay.push(game);
      }
    },
    gameOver: (state, action) => {
      //POST GAME DATA TO API
      state.inPlay = state.inPlay.filter(game => {
        return game.id !== action.payload.id;
      })
    }
  }
});

export const { loadVenueInfo, editVenueInfo, createVenue, queueGame, gameOn, gameOver } = gamesSlice.actions;

export const selectVenue = state => state.games.venue;
export const selectQueue = state => state.games.queue;
export const selectInPlay = state => state.games.inPlay;

export default gamesSlice.reducer;
