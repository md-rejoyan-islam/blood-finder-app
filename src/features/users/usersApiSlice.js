import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api url
const ApiURL = import.meta.env.VITE_APP_URL;

// update user data
export const addNewUser = createAsyncThunk(
  "auth/addNewUser",
  async ({ data, toggleModal, clearFields, setLoading }) => {
    try {
      const response = await axios.post(`${ApiURL}/api/v1/users/`, data, {
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

// all users
export const allUsers = createAsyncThunk("auth/allUsers", async () => {
  try {
    const response = await axios.get(`${ApiURL}/api/v1/users`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

// single user
export const findUserById = createAsyncThunk(
  "auth/findUserById",
  async (id) => {
    try {
      const response = await axios.get(`${ApiURL}/api/v1/users/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

// update user data
export const updateUserById = createAsyncThunk(
  "auth/updateUserById",
  async ({ id, data, toggleModal, setLoading }) => {
    try {
      const response = await axios.put(`${ApiURL}/api/v1/users/${id}`, data, {
        withCredentials: true,
      });
      toggleModal();
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);
// update user data
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async ({ id, password, toggleModal, setLoading }) => {
    try {
      const response = await axios.put(
        `${ApiURL}/api/v1/users/password-change/${id}`,
        { password },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toggleModal();
      return response.data;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response.data.error.message);
    }
  }
);

// delete user data
export const deleteUserById = createAsyncThunk(
  "auth/deleteUserById",
  async (id) => {
    try {
      const response = await axios.delete(
        `${ApiURL}/api/v1/users/${id}`,

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
