import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import AchievementCard from "../components/AchievementCard";
import AddAchievementModal from "../components/AddAchievementModal";
import API from "../services/api";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Fetch achievements from the backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await API.get("/achievements");
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  // Handle adding a new achievement
  const handleAddAchievement = async (newAchievement) => {
    try {
      const response = await API.post("/achievements", newAchievement);
      setAchievements((prevAchievements) => [...prevAchievements, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  // Handle editing an achievement
  const handleEditAchievement = async (updatedAchievement) => {
    try {
      await API.put(`/achievements/${updatedAchievement.AchievementID}`, updatedAchievement);
      setAchievements((prevAchievements) =>
        prevAchievements.map((achievement) =>
          achievement.AchievementID === updatedAchievement.AchievementID
            ? updatedAchievement
            : achievement
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing achievement:", error);
    }
  };

  // Handle deleting an achievement
  const handleDeleteAchievement = async (achievementID) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await API.delete(`/achievements/${achievementID}`);
        setAchievements((prevAchievements) =>
          prevAchievements.filter((achievement) => achievement.AchievementID !== achievementID)
        );
      } catch (error) {
        console.error("Error deleting achievement:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Achievements
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Achievement
      </Button>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.AchievementID}>
            <AchievementCard
              achievement={achievement}
              onEdit={(achievement) => {
                setCurrentAchievement(achievement);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeleteAchievement}
            />
          </Grid>
        ))}
      </Grid>
      <AddAchievementModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAchievement}
      />
      {currentAchievement && (
        <AddAchievementModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditAchievement}
          initialData={currentAchievement} // Pass initial data for editing
        />
      )}
    </Container>
  );
};

export default Achievements;