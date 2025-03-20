import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddMatchModal = ({ open, onClose, onAdd, initialData }) => {
  const [team1ID, setTeam1ID] = useState("");
  const [team2ID, setTeam2ID] = useState("");
  const [winnerTeamID, setWinnerTeamID] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTeam1ID(initialData.Team1ID || "");
      setTeam2ID(initialData.Team2ID || "");
      setWinnerTeamID(initialData.WinnerTeamID || "");
      setDate(initialData.Date ? new Date(initialData.Date).toISOString().split("T")[0] : "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const matchData = {
      ...initialData, // Include MatchID for editing
      Team1ID: parseInt(team1ID),
      Team2ID: parseInt(team2ID),
      WinnerTeamID: parseInt(winnerTeamID),
      Date: new Date(date),
    };
    onAdd(matchData);
    setTeam1ID("");
    setTeam2ID("");
    setWinnerTeamID("");
    setDate("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Match" : "Add Match"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Team 1 ID"
          fullWidth
          margin="normal"
          value={team1ID}
          onChange={(e) => setTeam1ID(e.target.value)}
        />
        <TextField
          label="Team 2 ID"
          fullWidth
          margin="normal"
          value={team2ID}
          onChange={(e) => setTeam2ID(e.target.value)}
        />
        <TextField
          label="Winner Team ID"
          fullWidth
          margin="normal"
          value={winnerTeamID}
          onChange={(e) => setWinnerTeamID(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {initialData ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMatchModal;