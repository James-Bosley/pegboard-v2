import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    addPlayer: (state, action) => {
      let newPlayer = action.payload;
      newPlayer.selected = false;
      state.players.push(action.payload);
    },
    selectedPlayer: (state, action) => {
      state.players = state.players.map((player) => {
        if (player.id === action.payload) {
          return (player.selected = true);
        }
        return player;
      });
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
