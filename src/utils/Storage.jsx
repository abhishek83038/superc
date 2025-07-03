// src/storage/localStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';
const COUNTRY_KEY = 'selected_country';

// ✅ Save Token
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// ✅ Get Token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// ✅ Remove Token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// ✅ Save Country Object
export const saveCountry = async (countryObject) => {
  try {
    const jsonValue = JSON.stringify(countryObject);
    await AsyncStorage.setItem(COUNTRY_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving country:', error);
  }
};

// ✅ Get Country Object
export const getCountry = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(COUNTRY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting country:', error);
    return null;
  }
};

// ✅ Remove Country
export const removeCountry = async () => {
  try {
    await AsyncStorage.removeItem(COUNTRY_KEY);
  } catch (error) {
    console.error('Error removing country:', error);
  }
};
