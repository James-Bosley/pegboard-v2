import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userType: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      //AUTH WITH API
    },
    logOut: (state, action) => {
      state.user = null;
      state.userType = null;
    }
  }
});

export const { logIn, logOut } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;
