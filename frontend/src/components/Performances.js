import API from "../services/api";
import Chart from "chart.js/auto";

export default async function Performances() {
  let batting, bowling, fielding;
  try {
    const response = await API.get("/performances", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    ({ batting, bowling, fielding } = response.data);
  } catch (error) {
    console.error("Error fetching performances:", error.response ? error.response.data : error.message);
    return `
      <div class="text-center mt-5">
        <p class="text-danger">Failed to load performances. Please try again later.</p>
      </div>
    `;
  }

  setTimeout(() => {
    const ctx = document.getElementById("performanceChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: batting.map((p) => p.PlayerID),
        datasets: [
          {
            label: "Runs",
            data: batting.map((p) => p.Runs),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  }, 0);

  return `
    <div>
      <h2>Player Performances</h2>
      <canvas id="performanceChart" width="400" height="200"></canvas>
    </div>
  `;
}
