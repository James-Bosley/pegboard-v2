import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logInUser = createAsyncThunk(
  'user/logIn',
  async (input , thunkAPI) => {
    const response = await fetch(`/api/user/${input.username}?password=${input.password}`);
    const user = await response.json();
    return user[0];
  }
);

const initialState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
  }
});

export const { logOut } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;
