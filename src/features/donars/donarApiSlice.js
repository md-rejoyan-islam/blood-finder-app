import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api url
const ApiURL = import.meta.env.VITE_APP_URL;

// add donar data
export const addNewDonar = createAsyncThunk(
  "auth/addNewDonar",
  async ({ fields, setLoading, clearFields, toggleModal }) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/donars`, fields, {
        withCredentials: true,
      });
      clearFields();
      toggleModal();
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);

// all donars
export const allDonars = createAsyncThunk("auth/allDonars", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/donars`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// single donar by id
export const findDonarById = createAsyncThunk(
  "auth/findDonarById",
  async (id) => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/donars/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// update donar data by id
export const updateDonarById = createAsyncThunk(
  "auth/updateDonarById",
  async ({ id, data, setLoading, toggleModal }) => {
    try {
      const response = await axios.put(`${ApiURL}/api/v1/donars/${id}`, data, {
        withCredentials: true,
      });
      setLoading(false);
      toggleModal && toggleModal();
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);

// delete donar data
export const deleteDonarById = createAsyncThunk(
  "auth/deleteDonarById",
  async (id) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/api/v1/donars/${id}`,

        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// bulk delete donar data
export const bulkDeleteDonar = createAsyncThunk(
  "auth/bulkDeleteDonar",
  async (data) => {
    try {
      const response = await axios.post(
        `${ApiURL}/api/v1/donars/bulk-delete`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// donar file upload
export const donarFileUpload = createAsyncThunk(
  "auth/donarFileUpload",
  async ({ form, setLoading }) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/donars/file`, form, {
        withCredentials: true,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);
