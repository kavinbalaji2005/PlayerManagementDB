import API from "../services/api";

export default async function Matches() {
  // Show spinner while loading
  document.getElementById("main-content").innerHTML = `
    <div class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  const matches = await API.get("/matches").then((res) => res.data);

  // Render matches after loading
  return `
    <div>
      <h2>Matches</h2>
      <button class="btn btn-success mb-3" onclick="showAddMatchModal()">Add Match</button>
      <div class="row">
        ${matches
          .map(
            (match) => `
          <div class="col-md-4">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Match ID: ${match.MatchID}</h5>
                <p class="card-text">
                  <strong>Date:</strong> ${new Date(match.Date).toLocaleDateString()}<br>
                  <strong>Team 1:</strong> ${match.Team1ID}<br>
                  <strong>Team 2:</strong> ${match.Team2ID}<br>
                  <strong>Winner:</strong> ${match.WinnerTeamID || "TBD"}
                </p>
                <button class="btn btn-primary btn-sm" onclick="editMatch(${match.MatchID})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteMatch(${match.MatchID})">Delete</button>
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

// Show Add Match Modal
window.showAddMatchModal = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="addMatchModal" tabindex="-1" aria-labelledby="addMatchModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addMatchModalLabel">Add Match</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-match-form">
              <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" required>
              </div>
              <div class="mb-3">
                <label for="team1" class="form-label">Team 1 ID</label>
                <input type="number" class="form-control" id="team1" required>
              </div>
              <div class="mb-3">
                <label for="team2" class="form-label">Team 2 ID</label>
                <input type="number" class="form-control" id="team2" required>
              </div>
              <button type="submit" class="btn btn-primary">Add Match</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("addMatchModal"));
  modal.show();

  document.getElementById("add-match-form").onsubmit = async (e) => {
    e.preventDefault();
    const newMatch = {
      Date: document.getElementById("date").value,
      Team1ID: document.getElementById("team1").value,
      Team2ID: document.getElementById("team2").value,
    };
    await API.post("/matches", newMatch);
    modal.hide();
    window.loadMatches();
  };
};

// Edit Match
window.editMatch = async (matchID) => {
  const match = await API.get(`/matches/${matchID}`).then((res) => res.data);
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="editMatchModal" tabindex="-1" aria-labelledby="editMatchModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editMatchModalLabel">Edit Match</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-match-form">
              <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" value="${new Date(match.Date).toISOString().split("T")[0]}" required>
              </div>
              <div class="mb-3">
                <label for="team1" class="form-label">Team 1 ID</label>
                <input type="number" class="form-control" id="team1" value="${match.Team1ID}" required>
              </div>
              <div class="mb-3">
                <label for="team2" class="form-label">Team 2 ID</label>
                <input type="number" class="form-control" id="team2" value="${match.Team2ID}" required>
              </div>
              <button type="submit" class="btn btn-primary">Update Match</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("editMatchModal"));
  modal.show();

  document.getElementById("edit-match-form").onsubmit = async (e) => {
    e.preventDefault();
    const updatedMatch = {
      Date: document.getElementById("date").value,
      Team1ID: document.getElementById("team1").value,
      Team2ID: document.getElementById("team2").value,
    };
    await API.put(`/matches/${matchID}`, updatedMatch);
    modal.hide();
    window.loadMatches();
  };
};

// Delete Match
window.deleteMatch = async (matchID) => {
  if (confirm("Are you sure you want to delete this match?")) {
    await API.delete(`/matches/${matchID}`);
    window.loadMatches();
  }
};