import { login } from "../services/auth";

export default function Login() {
  return `
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style="width: 24rem;">
        <h2 class="text-center mb-4">Login</h2>
        <form id="login-form">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Enter your username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div> 
    </div>
  `;
}

// Handle form submission
document.addEventListener("submit", async (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      await login(username, password);
      alert("Login successful!");
      window.location.reload(); // Reload the page to show the dashboard
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    }
  }
});