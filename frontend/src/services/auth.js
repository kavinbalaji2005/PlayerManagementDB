import API from "./api";

// Login by selecting a role
export const loginWithRole = async (role, userID) => {
  try {
    const response = await API.post("/auth/select-role", { role, userID });
    const { token } = response.data;

    // Save the token to localStorage
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

// Login with username and password
export const login = async (username, password) => {
  try {
    const response = await API.post("/auth/login", { username, password });
    const { token, role } = response.data;

    // Save the token and role to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

// Logout by clearing the token and role
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};