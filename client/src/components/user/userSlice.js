import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      return 401;
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

const initialState = {
  user: null,
  loggedInStatus: { loggedIn: false, message: null },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserSession.fulfilled, (state, action) => {
      if (action.payload !== 401) {
        state.user = action.payload;
        state.loggedInStatus.loggedIn = true;
        state.loggedInStatus.message = null;
      } else {
        state.user = null;
        state.loggedInStatus.loggedIn = false;
        state.loggedInStatus.message = "Session Expired";
      }
    });

    builder.addCase(logInUser.pending, (state, action) => {
      state.loggedInStatus.message = "Loading";
    });

    builder.addCase(logInUser.fulfilled, (state, action) => {
      if (action.payload !== 401) {
        state.user = action.payload;
        state.loggedInStatus.loggedIn = true;
        state.loggedInStatus.message = null;
      }
    });

    builder.addCase(logInUser.rejected, (state, action) => {
      state.loggedInStatus.message = "Authorization Failed";
    });

    builder.addCase(logOutUser.fulfilled, (state, action) => {
      if (action.payload === 200) {
        state.user = null;
        state.loggedInStatus = { loggedIn: false, message: null };
      } else {
        state.loggedInStatus.message = "An Error Occurred";
      }
    });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.loggedInStatus;

export default userSlice.reducer;
