import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkUserSession = createAsyncThunk(
  "user/checkSession",
  async (input, thunkAPI) => {
    const response = await fetch(`/v1/user/checksession`);
    if (response.status === 401) {
      return 401;
    }
    const user = await response.json();
    return user;
  }
);

export const logInUser = createAsyncThunk(
  "user/logIn",
  async (input, thunkAPI) => {
    const response = await fetch(`/v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: input.username,
        password: input.password,
      }),
    });
    if (response === 401) {
      return response;
    }
    const user = await response.json();
    return user;
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOut",
  async (input, thunkAPI) => {
    const response = await fetch("/v1/user/logout");
    return response.status;
  }
);

export const alterPlayer = createAsyncThunk(
  "user/alterPlayer",
  async (input, thunkAPI) => {
    const response = await fetch("/v1/user/player", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (response === 500) {
      return response;
    }
    const player = await response.json();
    return player;
  }
);
