import axios from "axios";

const BASE_URL = "https://analytics-backend-odh4.onrender.com"; // Replace with your Django API base URL

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/api/register/`, userData);
  return response;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${BASE_URL}/api/login/`, loginData);
  return response;
};

export const saveAuthTokenInCookie = (token) => {
  // Use a library like js-cookie to manage cookies
  document.cookie = `auth_token=${token}; path=/;`;
};

export const isAuthenticated = () => {
  const token = document.cookie
    .split(";")
    .map((c) => c.trim()) // Trim each cookie to remove leading/trailing spaces
    .find((c) => c.startsWith("auth_token="));
  return token !== undefined;
};

// Add more API functions for upload and query as needed
// ...

export default {
  registerUser,
  loginUser,
  saveAuthTokenInCookie,
  // ... other API functions
};
