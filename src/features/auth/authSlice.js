// create auth slice
import { createSlice } from "@reduxjs/toolkit";
import {
  loggedInUser,
  updateUserData,
  userLogin,
  userLogout,
} from "./authApiSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    message: null,
    loading: true,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.message = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })

      // logout
      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.user = null;
        state.message = action.payload.message;
        localStorage.clear();
      })

      // logged in user
      .addCase(loggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loggedInUser.rejected, (state) => {
        // state.error = action.error.message;
        state.loading = false;
        state.user = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        // state.message = action.payload.message;
      })

      // update user data
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.message = action.payload.message;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
      });
  },
});

// selectors
export const getAuthData = (state) => state.auth;

// actions
export const { setMessageEmpty } = authSlice.actions;
// exports
export default authSlice.reducer;
