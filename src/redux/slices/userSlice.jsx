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

// 🚀 LOGIN
export const login = createAsyncThunk('user/loginProfiles', async (credentials, thunkAPI) => {
  console.log("cc",credentials)
  try {
    const response = await axios.post(`${BASE_URL}/user/loginProfiles`, credentials, {
      headers: {
        "Content-Type": "application/json",
      }
    },);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});
export const loginStudent = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  console.log("cc2",credentials)
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      }
    },);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});


// 🚀 REGISTER
export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

// 🚀 GET USER INFO
export const userInfo = createAsyncThunk('user/info', async (_, thunkAPI) => {
  try {
    const token = await getToken('token');
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
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
          // state.isLoggedIn = true,
          // state.profile = action.payload.profile,
          state.isLoading = false
        // state.isParent = action.payload.isParent,
        // state.isSchool = action.payload.isSchool,
        // state.error = "",
        // state.isSubscribed = action.payload.subscribed,
        // state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false
        state.error = action.payload;
      })

      // login final

      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)
          state.isLoggedIn = true,
          state.isLoading = false,
          state.error = "",
          state.token=action.payload.token
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false
        state.error = action.payload;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.profile = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get User Info
      .addCase(userInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.name = action.payload.name,
          state.isLoggedIn = true,
          state.profile = action.payload.profile,
          state.isLoading = false
        state.isParent = action.payload.isParent,
          state.isSchool = action.payload.isSchool,
          state.error = "",
          state.isSubscribed = action.payload.subscribed,
          state.user = action.payload.user
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
