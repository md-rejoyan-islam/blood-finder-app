import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api url
const ApiURL = import.meta.env.VITE_APP_URL;

// all history
export const allPatient = createAsyncThunk("auth/allPateint", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/patient`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// create pateint data
export const addNewPatient = createAsyncThunk(
  "auth/addNewPatient",
  async ({ fields, setLoading, toggleModal, clearFields }) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/patient`, fields, {
        withCredentials: true,
      });
      setLoading(false);
      toggleModal();
      clearFields();
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);

// update pateint data
export const updatePatientById = createAsyncThunk(
  "auth/updatePatientById",
  async ({ id, data, setLoading, toggleModal }) => {
    try {
      const response = await axios.put(`${ApiURL}/api/v1/patient/${id}`, data, {
        withCredentials: true,
      });
      setLoading(false);
      toggleModal();
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);

// delete pateint data
export const deletePatientById = createAsyncThunk(
  "auth/deletePatientById",
  async (id) => {
    try {
      const response = await axios.delete(`${ApiURL}/api/v1/patient/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);
