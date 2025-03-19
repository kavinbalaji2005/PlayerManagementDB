import API from "./api";

// Login with username and password
export const login = async (username, password) => {
  try {
    const response = await API.post("/auth/login", { username, password });
    localStorage.setItem("username", username); // Save username to localStorage
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

// Logout by clearing localStorage
export const logout = () => {
  localStorage.clear();
};