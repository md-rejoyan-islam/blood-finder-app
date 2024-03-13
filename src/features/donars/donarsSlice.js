// create auth slice
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDonar,
  allDonars,
  bulkDeleteDonar,
  deleteDonarById,
  donarFileUpload,
  findDonarById,
  updateDonarById,
} from "./donarApiSlice";

const donarsSlice = createSlice({
  name: "donars",
  initialState: {
    donars: JSON.parse(localStorage.getItem("donars")) || [],
    donar: null,
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
      // get all donars
      .addCase(allDonars.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(allDonars.fulfilled, (state, action) => {
        state.donars = action.payload.data;
        // state.message = action.payload.message;
        localStorage.setItem("donars", JSON.stringify(action.payload.data));
      })
      // update donar data by id
      .addCase(updateDonarById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateDonarById.fulfilled, (state, action) => {
        state.donars = state.donars.map((donar) =>
          donar.id === action.payload.data.id ? action.payload.data : donar
        );
        state.message = action.payload.message;
        localStorage.setItem("donars", JSON.stringify(state.donars));
      })

      // delete donar data by id
      .addCase(deleteDonarById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteDonarById.fulfilled, (state, action) => {
        state.donars = state.donars.filter(
          (donar) => donar.id !== action.payload.data.id
        );
        state.message = action.payload.message;
        localStorage.setItem("donars", JSON.stringify(state.donars));
      })

      // add new donar
      .addCase(addNewDonar.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewDonar.fulfilled, (state, action) => {
        state.donars.push(action.payload.data);
        state.message = action.payload.message;
        localStorage.setItem("donars", JSON.stringify(state.donars));
      })

      // find donar by id
      .addCase(findDonarById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(findDonarById.fulfilled, (state, action) => {
        state.donar = action.payload.data;
        state.message = action.payload.message;
      })

      // bulk multiple delete
      .addCase(bulkDeleteDonar.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(bulkDeleteDonar.fulfilled, (state, action) => {
        state.donars = state.donars.filter(
          (donar) => !action.payload.data.includes(donar.id)
        );
        state.message = action.payload.message;
        localStorage.setItem("donars", JSON.stringify(state.donars));
      })
      // file upload
      .addCase(donarFileUpload.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(donarFileUpload.fulfilled, (state, action) => {
        state.donars = action.payload.data;
        state.message = action.payload.message;
        localStorage.setItem("donars", JSON.stringify(state.donars));
      });
  },
});

// selectors
export const getDonars = (state) => state.donars;

// actions
export const { setMessageEmpty } = donarsSlice.actions;
// exports
export default donarsSlice.reducer;
