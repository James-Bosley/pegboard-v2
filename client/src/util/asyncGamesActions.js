import { createAsyncThunk } from "@reduxjs/toolkit";

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
