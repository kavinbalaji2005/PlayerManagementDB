import API from "../services/api";
import Chart from "chart.js/auto";

export default async function Performances() {
  const { batting, bowling, fielding } = await API.get("/performances").then((res) => res.data);

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