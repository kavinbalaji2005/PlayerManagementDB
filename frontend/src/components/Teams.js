import API from "../services/api";

export default async function Teams() {
  // Show spinner while loading
  document.getElementById("main-content").innerHTML = `
    <div class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  const teams = await API.get("/teams").then((res) => res.data);

  // Render teams after loading
  return `
    <div>
      <h2>Teams</h2>
      <button class="btn btn-success mb-3" onclick="showAddTeamModal()">Add Team</button>
      <div class="row">
        ${teams
          .map(
            (team) => `
          <div class="col-md-4">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${team.TeamName}</h5>
                <p class="card-text">
                  <strong>Coach:</strong> ${team.Coach}<br>
                  <strong>Captain ID:</strong> ${team.CaptainID || "N/A"}
                </p>
                <button class="btn btn-primary btn-sm" onclick="editTeam(${team.TeamID})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTeam(${team.TeamID})">Delete</button>
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

// Show Add Team Modal
window.showAddTeamModal = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="addTeamModal" tabindex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTeamModalLabel">Add Team</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-team-form">
              <div class="mb-3">
                <label for="teamName" class="form-label">Team Name</label>
                <input type="text" class="form-control" id="teamName" required>
              </div>
              <div class="mb-3">
                <label for="coach" class="form-label">Coach</label>
                <input type="text" class="form-control" id="coach" required>
              </div>
              <button type="submit" class="btn btn-primary">Add Team</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("addTeamModal"));
  modal.show();

  document.getElementById("add-team-form").onsubmit = async (e) => {
    e.preventDefault();
    const newTeam = {
      TeamName: document.getElementById("teamName").value,
      Coach: document.getElementById("coach").value,
    };
    await API.post("/teams", newTeam);
    modal.hide();
    window.loadTeams();
  };
};

// Edit Team
window.editTeam = async (teamID) => {
  const team = await API.get(`/teams/${teamID}`).then((res) => res.data);
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="editTeamModal" tabindex="-1" aria-labelledby="editTeamModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editTeamModalLabel">Edit Team</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-team-form">
              <div class="mb-3">
                <label for="teamName" class="form-label">Team Name</label>
                <input type="text" class="form-control" id="teamName" value="${team.TeamName}" required>
              </div>
              <div class="mb-3">
                <label for="coach" class="form-label">Coach</label>
                <input type="text" class="form-control" id="coach" value="${team.Coach}" required>
              </div>
              <button type="submit" class="btn btn-primary">Update Team</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("editTeamModal"));
  modal.show();

  document.getElementById("edit-team-form").onsubmit = async (e) => {
    e.preventDefault();
    const updatedTeam = {
      TeamName: document.getElementById("teamName").value,
      Coach: document.getElementById("coach").value,
    };
    await API.put(`/teams/${teamID}`, updatedTeam);
    modal.hide();
    window.loadTeams();
  };
};

// Delete Team
window.deleteTeam = async (teamID) => {
  if (confirm("Are you sure you want to delete this team?")) {
    await API.delete(`/teams/${teamID}`);
    window.loadTeams();
  }
}; 