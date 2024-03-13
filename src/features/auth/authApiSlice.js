// register user

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import dotenv from "dotenv";
// dotenv.config();

const ApiURL = import.meta.env.VITE_APP_URL;

// login user
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ data, clearFields, setLoading }) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/auth/login`, data, {
        withCredentials: true,
      });
      clearFields();
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);

// logout  user
export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  try {
    const response = await axios.post(
      `${ApiURL}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// logged in user
export const loggedInUser = createAsyncThunk("auth/loggedInUser", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (data) => {
    try {
      const response = await axios.patch(
        `${ApiURL}/api/v1/users/${data.id}`,
        data.data,
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
