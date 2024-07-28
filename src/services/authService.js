import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8000"; // Replace with your Django API base URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/registration/`,
      userData
    );
    if (response.status === 201) {
      toast.success("User registered successfully");
    }
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.password1) {
        toast.error(`Registration failed: ${error.response.data.password1}`);
      } else if (error.response.data.username) {
        toast.error(`Registration failed: ${error.response.data.username}`);
      }
    } else {
      toast.error("Registration failed: An unknown error occurred");
    }
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login/`, loginData);
    if (response.status === 200) {
      toast.success("User logged in successfully");
    }
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(`Login failed: ${error.response.data.detail}`);
    } else {
      toast.error("Login failed: An unknown error occurred");
    }
    throw error;
  }
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
