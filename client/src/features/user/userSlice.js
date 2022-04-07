import { createSlice } from "@reduxjs/toolkit";
import {
  logInUser,
  logOutUser,
  checkUserSession,
  alterPlayer,
} from "../../util/asyncUserActions";

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

    builder.addCase(alterPlayer.fulfilled, (state, action) => {
      if (action.payload !== 500) {
        state.user.player = action.payload;
      }
    });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.loggedInStatus;

export default userSlice.reducer;
