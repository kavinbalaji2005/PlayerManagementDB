import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import TeamCard from "../components/TeamCard";
import AddTeamModal from "../components/AddTeamModal";
import API from "../services/api";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);

  // Fetch teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await API.get("/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  // Handle adding a new team
  const handleAddTeam = async (newTeam) => {
    try {
      const response = await API.post("/teams", newTeam);
      setTeams((prevTeams) => [...prevTeams, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  // Handle editing a team
  const handleEditTeam = async (updatedTeam) => {
    try {
      await API.put(`/teams/${updatedTeam.TeamID}`, updatedTeam);
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.TeamID === updatedTeam.TeamID ? updatedTeam : team
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing team:", error);
    }
  };

  // Handle deleting a team
  const handleDeleteTeam = async (teamID) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await API.delete(`/teams/${teamID}`);
        setTeams((prevTeams) =>
          prevTeams.filter((team) => team.TeamID !== teamID)
        );
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Team
      </Button>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.TeamID}>
            <TeamCard
              team={team}
              onEdit={(team) => {
                setCurrentTeam(team);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeleteTeam}
            />
          </Grid>
        ))}
      </Grid>
      <AddTeamModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeam}
      />
      {currentTeam && (
        <AddTeamModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditTeam}
          initialData={currentTeam} // Pass initial data for editing
        />
      )}
    </Container>
  );
};

export default Teams;