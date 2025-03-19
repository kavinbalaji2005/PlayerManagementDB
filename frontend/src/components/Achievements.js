
import axios from 'axios';

export default async function Achievements() {
  // Show spinner while loading
  document.getElementById("main-content").innerHTML = `
    <div class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
 
  const achievements = await axios.get("http://localhost:5000/api/achievements").then((res) => res.data);

  // Render achievements after loading
  return `
    <div>
      <h2>Achievements</h2>
      <button class="btn btn-success mb-3" onclick="showAddAchievementModal()">Add Achievement</button>
      <div class="row">
        ${achievements
          .map(
            (achievement) => `
          <div class="col-md-4">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Achievement ID: ${achievement.AchievementID}</h5>
                <p class="card-text">
                  <strong>Player ID:</strong> ${achievement.PlayerID}<br>
                  <strong>Award:</strong> ${achievement.Award}<br>
                  <strong>Date:</strong> ${new Date(achievement.Date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// Show Add Achievement Modal
window.showAddAchievementModal = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="addAchievementModal" tabindex="-1" aria-labelledby="addAchievementModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAchievementModalLabel">Add Achievement</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-achievement-form">
              <div class="mb-3">
                <label for="playerID" class="form-label">Player ID</label>
                <input type="number" class="form-control" id="playerID" required>
              </div>
              <div class="mb-3">
                <label for="award" class="form-label">Award</label>
                <input type="text" class="form-control" id="award" required>
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" required>
              </div>
              <button type="submit" class="btn btn-primary">Add Achievement</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("addAchievementModal"));
  modal.show();

  document.getElementById("add-achievement-form").onsubmit = async (e) => {
    e.preventDefault();
    const newAchievement = {
      PlayerID: document.getElementById("playerID").value,
      Award: document.getElementById("award").value,
      Date: document.getElementById("date").value,
    };
    await axios.post("/achievements", newAchievement);
    modal.hide();
    window.loadAchievements();
  };
};