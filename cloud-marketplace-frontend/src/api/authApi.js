import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Backend API URL

// function for Signup
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData); // ✅ Ensure this matches backend
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// function for login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData); // ✅ Ensure this matches backend
    return response.data; // Return response with token
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
