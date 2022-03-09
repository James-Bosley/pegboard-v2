import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logInUser = createAsyncThunk(
  "user/logIn",
  async (input, thunkAPI) => {
    const response = await fetch(
      `/v1/users/${input.username}?password=${input.password}`
    );
    const user = await response.json();
    return user;
  }
);

const initialState = {
  user: null,
  loggedInStatus: { loggedIn: false, message: null },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      state.loggedInStatus.loggedIn = false;
      state.loggedInStatus.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state, action) => {
      state.loggedInStatus.message = "Loading";
    });

    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loggedInStatus.loggedIn = true;
      state.loggedInStatus.message = null;
    });

    builder.addCase(logInUser.rejected, (state, action) => {
      state.loggedInStatus.message = "Authorization Failed";
    });
  },
});

export const { logOut } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.loggedInStatus;

export default userSlice.reducer;
