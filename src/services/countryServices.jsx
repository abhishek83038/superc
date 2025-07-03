// src/api/userApi.js
import axios from 'axios';
import { BASE_URL } from '../utils/common'; // ✅ Ensure correct path and value

export const getCountryList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/country/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Axios Error:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
    throw error; // rethrow for Redux or screen-level handling
  }
};
