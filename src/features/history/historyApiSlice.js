import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api url
const ApiURL = import.meta.env.VITE_APP_URL;

// all history
export const allHistory = createAsyncThunk("auth/allHistory", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/history`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});
