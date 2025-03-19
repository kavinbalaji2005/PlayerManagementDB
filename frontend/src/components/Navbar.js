import { logout } from "../services/auth";

export default function Navbar() {
  const links = [
    { name: "Dashboard", action: "loadDashboard" },
    { name: "Players", action: "loadPlayers" },
    { name: "Teams", action: "loadTeams" },
    { name: "Matches", action: "loadMatches" },
    { name: "Performances", action: "loadPerformances" },
    { name: "Achievements", action: "loadAchievements" },
  ];

  const renderLinks = () =>
    links
      .map(
        (link) => `
        <li class="nav-item">
          <a class="nav-link" href="#" data-action="${link.action}">${link.name}</a>
        </li>
      `
      )
      .join("");

  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Player Management</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            ${renderLinks()}
          </ul>
          <button class="btn btn-danger ms-auto" id="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  `;
}

// Attach event listeners after rendering the navbar
export function setupNavbarEventListeners() {
  // Highlight the active link
  document.querySelectorAll(".nav-link").forEach((link) => {
    console.log(`Attaching click event to link: ${link.textContent}`); // Debug log
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const action = link.getAttribute("data-action");
      console.log(`Link clicked: ${link.textContent}, Action: ${action}`); // Debug log
      if (action && typeof window[action] === "function") {
        window[action]();
      }

      // Remove active class from all links
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
      // Add active class to the clicked link
      link.classList.add("active");
    });
  });

  // Handle logout
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    console.log("Attaching click event to logout button"); // Debug log
    logoutButton.addEventListener("click", () => {
      logout();
      alert("You have been logged out.");
      window.location.reload(); // Reload the page to show the login screen
    });
  }
}