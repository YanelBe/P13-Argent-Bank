import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserApi,
  getUserProfile as getUserProfileApi,
  updateUserProfile as updateUserProfileApi,
} from "../api/services";


//Thunk Async pour la connexion utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    const token = await loginUserApi(email, password);
    return token;
  }
);


export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (token) => {
    try {
      const userProfile = await getUserProfileApi(token);
      return userProfile;
    } catch (error) {
      throw error;
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ token, updatedProfile }, { rejectWithValue }) => {
    try {
      const data = await updateUserProfileApi(token, updatedProfile);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
