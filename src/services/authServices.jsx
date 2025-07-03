// src/api/userApi.js
import axios from 'axios';
import { BASE_URL } from '../utils/common'; // Ensure this path is correct


export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/user/login`, credentials);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};

export const getUserInfo = async (token) => {
  const response = await axios.get(`${BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
