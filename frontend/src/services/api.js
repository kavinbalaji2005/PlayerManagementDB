import axios from "axios";

// Create an Axios instance with the base URL of the backend API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
});

// Add an interceptor to include the JWT token in every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
  }
  return config;
});

export default API;