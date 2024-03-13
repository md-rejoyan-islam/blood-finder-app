// create auth slice
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewUser,
  allUsers,
  deleteUserById,
  findUserById,
  updateUserById,
  updateUserPassword,
} from "./usersApiSlice";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all users
      .addCase(allUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        // state.message = action.payload.message;
        localStorage.setItem("users", JSON.stringify(action.payload.data));
      })
      // update user data by id
      .addCase(updateUserById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.data.id ? action.payload.data : user
        );
        state.message = action.payload.message;
        localStorage.setItem("users", JSON.stringify(state.users));
      })
      // password change
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users = state.users.map((user) =>
          user.id === action.payload.data.id ? action.payload.data : user
        );
        localStorage.setItem("users", JSON.stringify(state.users));
      })

      // delete user data by id
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.data.id
        );
        // state.message = action.payload.message;
        localStorage.setItem("users", JSON.stringify(state.users));
      })

      // add new user
      .addCase(addNewUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
        state.message = action.payload.message;
        localStorage.setItem("users", JSON.stringify(state.users));
      })

      // find user by id
      .addCase(findUserById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(findUserById.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.message = action.payload.message;
      });
  },
});

// selectors
export const getUsers = (state) => state.users;

// actions
export const { setMessageEmpty } = usersSlice.actions;
// exports
export default usersSlice.reducer;
