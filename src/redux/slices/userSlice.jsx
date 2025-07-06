// src/redux/slices/userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/common';
import { getToken } from "../../utils/Storage";

const initialState = {
  token: null,
  name: "",
  isLoggedIn: false,
  profile: null,
  isLoading: false,
  isParent: false,
  isSchool: false,
  error: "",
  isSubscribed: false,
  user: null
};

// 🚀 GET USER INFO
export const userInfo = createAsyncThunk('user/info', async (_, thunkAPI) => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});




const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      // Get User Info
      .addCase(userInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.name = action.payload.name,
          state.isLoggedIn = true,
          state.profile = action.payload.profile,
          state.isLoading = false,
          state.isParent = action.payload.isParent,
          state.isSchool = action.payload.isSchool,
          state.error = "",
          state.isSubscribed = action.payload.subscribed,
          state.user = action.payload
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
