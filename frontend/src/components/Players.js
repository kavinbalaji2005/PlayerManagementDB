import API from "../services/api";

export default async function Players() {
  try {
    const players = await API.get("/players").then((res) => res.data);

    // Return players HTML content
    return `
      <div>
        <h2>Players</h2>
        <button class="btn btn-success mb-3" onclick="showAddPlayerModal()">Add Player</button>
        <div class="row">
          ${players
            .map(
              (player) => `
            <div class="col-md-4">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${player.Name}</h5>
                  <p class="card-text">
                    <strong>Age:</strong> ${player.Age}<br>
                    <strong>Role:</strong> ${player.Role}<br>
                  </p>
                  <button class="btn btn-primary btn-sm" onclick="editPlayer(${player.PlayerID})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="deletePlayer(${player.PlayerID})">Delete</button>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching players:", error);
    return `
      <div class="text-center mt-5">
        <p class="text-danger">Failed to load players. Please try again later.</p>
      </div>
    `;
  }
}

// Show Add Player Modal
window.showAddPlayerModal = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="addPlayerModal" tabindex="-1" aria-labelledby="addPlayerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addPlayerModalLabel">Add Player</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-player-form">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" required>
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input type="number" class="form-control" id="age" required>
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <input type="text" class="form-control" id="role" required>
              </div>
              <button type="submit" class="btn btn-primary">Add Player</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("addPlayerModal"));
  modal.show();

  document.getElementById("add-player-form").onsubmit = async (e) => {
    e.preventDefault();
    const newPlayer = {
      Name: document.getElementById("name").value,
      Age: document.getElementById("age").value,
      Role: document.getElementById("role").value,
    };
    await API.post("/players", newPlayer);
    modal.hide();
    window.loadPlayers();
  };
};

// Edit Player
window.editPlayer = async (playerID) => {
  const player = await API.get(`/players/${playerID}`).then((res) => res.data);
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal fade" id="editPlayerModal" tabindex="-1" aria-labelledby="editPlayerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editPlayerModalLabel">Edit Player</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-player-form">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" value="${player.Name}" required>
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input type="number" class="form-control" id="age" value="${player.Age}" required>
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <input type="text" class="form-control" id="role" value="${player.Role}" required>
              </div>
              <button type="submit" class="btn btn-primary">Update Player</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const modal = new bootstrap.Modal(document.getElementById("editPlayerModal"));
  modal.show();

  document.getElementById("edit-player-form").onsubmit = async (e) => {
    e.preventDefault();
    const updatedPlayer = {
      Name: document.getElementById("name").value,
      Age: document.getElementById("age").value,
      Role: document.getElementById("role").value,
    };
    await API.put(`/players/${playerID}`, updatedPlayer);
    modal.hide();
    window.loadPlayers();
  };
};

// Delete Player
window.deletePlayer = async (playerID) => {
  if (confirm("Are you sure you want to delete this player?")) {
    try {
      await API.delete(`/players/${playerID}`);
      alert("Player deleted successfully!");
      window.loadPlayers(); // Reload players
    } catch (error) {
      console.error("Error deleting player:", error);
      alert(error.response?.data?.error || "Failed to delete player. Please try again.");
    }
  }
};