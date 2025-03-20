import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import PlayerCard from "../components/PlayerCard";
import AddPlayerModal from "../components/AddPlayerModal";
import API from "../services/api";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Fetch players from the backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await API.get("/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  // Handle adding a new player
  const handleAddPlayer = async (newPlayer) => {
    try {
      const response = await API.post("/players", newPlayer);
      setPlayers((prevPlayers) => [...prevPlayers, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  // Handle editing a player
  const handleEditPlayer = async (updatedPlayer) => {
    try {
      await API.put(`/players/${updatedPlayer.PlayerID}`, updatedPlayer);
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.PlayerID === updatedPlayer.PlayerID ? updatedPlayer : player
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing player:", error);
    }
  };

  // Handle deleting a player
  const handleDeletePlayer = async (playerID) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await API.delete(`/players/${playerID}`);
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player.PlayerID !== playerID)
        );
      } catch (error) {
        console.error("Error deleting player:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Players
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Player
      </Button>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.PlayerID}>
            <PlayerCard
              player={player}
              onEdit={(player) => {
                setCurrentPlayer(player);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeletePlayer}
            />
          </Grid>
        ))}
      </Grid>
      <AddPlayerModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlayer}
      />
      {currentPlayer && (
        <AddPlayerModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditPlayer}
          initialData={currentPlayer} // Pass initial data for editing
        />
      )}
    </Container>
  );
};

export default Players;