import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  selectedPlayers: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    selectPlayer: (state, action) => {
      state.selectedPlayers.push(
        state.players.filter((player) => player.id === action.payload.id)[0]
      );
      state.players = state.players.filter((player) => {
        return player.id !== action.payload.id;
      });
    },
    deselectPlayer: (state, action) => {
      state.players.push(
        state.selectedPlayers.filter(
          (player) => player.id === action.payload.id
        )[0]
      );
      state.selectedPlayers = state.selectedPlayers.filter((player) => {
        return player.id !== action.payload.id;
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
export const selectSelectedPlayers = (state) => state.player.selectedPlayers;

export default playerSlice.reducer;
