import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import Navbar, { setupNavbarEventListeners } from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Players from "./components/Players";
import Teams from "./components/Teams";
import Matches from "./components/Matches";
import Performances from "./components/Performances";
import Achievements from "./components/Achievements";
import Login from "./components/Login";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("username");
};

// Function to load a specific component into the main content area
const loadComponent = async (component) => {
  document.getElementById("main-content").innerHTML = `
    <div class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  const content = await component();
  document.getElementById("main-content").innerHTML = content;
};

// Event handlers for navigation links
window.loadDashboard = () => loadComponent(Dashboard);
window.loadPlayers = () => loadComponent(Players);
window.loadTeams = () => loadComponent(Teams);
window.loadMatches = () => loadComponent(Matches);
window.loadPerformances = () => loadComponent(Performances);
window.loadAchievements = () => loadComponent(Achievements);

// Initial render
const renderApp = async () => {
  if (isAuthenticated()) {
    document.getElementById("app").innerHTML = `
      ${Navbar()}
      <div class="container mt-4" id="main-content">
        <div class="text-center mt-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    `;
    setupNavbarEventListeners(); // Attach event listeners after rendering the Navbar
    await loadComponent(Dashboard); // Load the default component (Dashboard)
  } else {
    document.getElementById("app").innerHTML = Login();
  }
};

renderApp();