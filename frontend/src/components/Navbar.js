import { logout } from "../services/auth";

export default function Navbar() {
  const role = localStorage.getItem("role");

  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Player Management</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#" onclick="loadDashboard()">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="loadPlayers()">Players</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="loadTeams()">Teams</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="loadMatches()">Matches</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="loadPerformances()">Performances</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="loadAchievements()">Achievements</a></li>
          </ul>
          <button class="btn btn-danger ms-auto" onclick="handleLogout()">Logout</button>
        </div>
      </div>
    </nav>
  `;
}

// Handle logout
window.handleLogout = () => {
  logout();
  alert("You have been logged out.");
  window.location.reload(); // Reload the page to show the login screen
};