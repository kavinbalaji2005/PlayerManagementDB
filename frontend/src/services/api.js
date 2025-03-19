import axios from "axios";

// Create an Axios instance with the base URL of the backend API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
});

export default API;