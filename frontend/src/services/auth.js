import API from "./api";

// Login with username and password
export const login = async (username, password) => {
  try {
    const response = await API.post("/auth/login", { username, password });
    const { role } = response.data;

    // Save the role to localStorage
    localStorage.setItem("role", role);

    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

// Logout by clearing the role
export const logout = () => {
  localStorage.removeItem("role");
};