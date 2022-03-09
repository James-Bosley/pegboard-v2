import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter((player) => {
        return player.id !== action.payload.id;
      });
    },
  },
});

export const { addPlayer, removePlayer } = playerSlice.actions;

export const selectPlayers = (state) => state.player.players;

export default playerSlice.reducer;
