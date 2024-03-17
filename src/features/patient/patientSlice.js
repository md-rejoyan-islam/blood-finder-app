// create auth slice
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewPatient,
  allPatient,
  deletePatientById,
  updatePatientById,
} from "./patientApiSlice";

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: localStorage?.getItem("patients")
      ? JSON.parse(localStorage?.getItem("patients"))
      : [],
  },
  reducers: {
    setPatientMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all patients
      .addCase(allPatient.rejected, () => {
        // state.error = action.error.message;
      })
      .addCase(allPatient.fulfilled, (state, action) => {
        state.patients = action.payload.data;
        // state.message = action.payload.message;
        localStorage.setItem("patients", JSON.stringify(action.payload.data));
      })
      // add patient data
      .addCase(addNewPatient.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.patients = [...state.patients, action.payload.data];
        state.message = action.payload.message;
        localStorage.setItem("patients", JSON.stringify(state.patients));
      })

      // update patient data by id
      .addCase(updatePatientById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePatientById.fulfilled, (state, action) => {
        state.patients = state.patients.map((patient) =>
          patient.id === action.payload.data.id ? action.payload.data : patient
        );
        state.message = action.payload.message;
        localStorage.setItem("patients", JSON.stringify(state.patients));
      })
      // delete patient data by id
      .addCase(deletePatientById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePatientById.fulfilled, (state, action) => {
        state.patients = state.patients.filter(
          (patient) => patient.id !== action.payload.data.id
        );
        state.message = action.payload.message;
        localStorage.setItem("patients", JSON.stringify(state.patients));
      });
  },
});

// selectors
export const getPatientsData = (state) => state.patient;

// actions
export const { setPatientMessageEmpty } = patientSlice.actions;

// exports
export default patientSlice.reducer;
