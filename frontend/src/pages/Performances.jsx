import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import PerformanceCard from "../components/PerformanceCard";
import EditPerformanceModal from "../components/EditPerformanceModal";
import API from "../services/api";

const Performances = () => {
  const [performances, setPerformances] = useState({ batting: [], bowling: [], fielding: [] });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPerformance, setCurrentPerformance] = useState(null);
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await API.get("/performances");
        setPerformances(response.data);
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
    };
    fetchPerformances();
  }, []);

  const handleEdit = (performance, type) => {
    setCurrentPerformance(performance);
    setCurrentType(type);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedPerformance) => {
    try {
      await API.put(`/performances/${updatedPerformance.PlayerID}`, {
        ...updatedPerformance,
        type: currentType,
      });
      setPerformances((prev) => ({
        ...prev,
        [currentType]: prev[currentType].map((p) =>
          p.PlayerID === updatedPerformance.PlayerID ? updatedPerformance : p
        ),
      }));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating performance:", error);
    }
  };

  const handleDelete = async (playerID, type) => {
    if (window.confirm("Are you sure you want to delete this performance?")) {
      try {
        await API.delete(`/performances/${playerID}`);
        setPerformances((prev) => ({
          ...prev,
          [type]: prev[type].filter((p) => p.PlayerID !== playerID),
        }));
      } catch (error) {
        console.error("Error deleting performance:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Performances
      </Typography>

      {/* Batting Performances */}
      <Typography variant="h5" gutterBottom>
        Batting Performances
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {performances.batting.map((performance) => (
          <Grid item xs={12} sm={6} md={4} key={performance.PlayerID}>
            <PerformanceCard
              performance={performance}
              type="batting"
              onEdit={(p) => handleEdit(p, "batting")}
              onDelete={(id) => handleDelete(id, "batting")}
            />
          </Grid>
        ))}
      </Grid>

      {/* Bowling Performances */}
      <Typography variant="h5" gutterBottom>
        Bowling Performances
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {performances.bowling.map((performance) => (
          <Grid item xs={12} sm={6} md={4} key={performance.PlayerID}>
            <PerformanceCard
              performance={performance}
              type="bowling"
              onEdit={(p) => handleEdit(p, "bowling")}
              onDelete={(id) => handleDelete(id, "bowling")}
            />
          </Grid>
        ))}
      </Grid>

      {/* Fielding Performances */}
      <Typography variant="h5" gutterBottom>
        Fielding Performances
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {performances.fielding.map((performance) => (
          <Grid item xs={12} sm={6} md={4} key={performance.PlayerID}>
            <PerformanceCard
              performance={performance}
              type="fielding"
              onEdit={(p) => handleEdit(p, "fielding")}
              onDelete={(id) => handleDelete(id, "fielding")}
            />
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      {currentPerformance && (
        <EditPerformanceModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
          initialData={currentPerformance}
          type={currentType}
        />
      )}
    </Container>
  );
};

export default Performances;