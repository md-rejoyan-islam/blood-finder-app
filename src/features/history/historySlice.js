// create auth slice
import { createSlice } from "@reduxjs/toolkit";
import { allHistory } from "./historyApiSlice";

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [],
  },
  extraReducers: (builder) => {
    builder
      // get all donars
      .addCase(allHistory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(allHistory.fulfilled, (state, action) => {
        state.history = action.payload.data;
        // state.message = action.payload.message;
        localStorage.setItem("history", JSON.stringify(action.payload.data));
      });
  },
});

// selectors
export const getHistory = (state) => state.history;

// exports
export default historySlice.reducer;
