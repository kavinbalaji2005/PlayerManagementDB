import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddAchievementModal = ({ open, onClose, onAdd, initialData }) => {
  const [playerID, setPlayerID] = useState("");
  const [award, setAward] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setPlayerID(initialData.PlayerID || "");
      setAward(initialData.Award || "");
      setDate(initialData.Date ? new Date(initialData.Date).toISOString().split("T")[0] : "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const achievementData = {
      ...initialData, // Include AchievementID for editing
      PlayerID: parseInt(playerID),
      Award: award,
      Date: new Date(date),
    };
    onAdd(achievementData);
    setPlayerID("");
    setAward("");
    setDate("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Player ID"
          fullWidth
          margin="normal"
          value={playerID}
          onChange={(e) => setPlayerID(e.target.value)}
        />
        <TextField
          label="Award"
          fullWidth
          margin="normal"
          value={award}
          onChange={(e) => setAward(e.target.value)}
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

export default AddAchievementModal;