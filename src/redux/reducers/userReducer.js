import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getUserProfile, updateUserProfile } from "../actions/userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.profile = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logoutUser, updateName } = userSlice.actions;

export default userSlice.reducer;
