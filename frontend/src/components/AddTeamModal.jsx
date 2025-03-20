import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddTeamModal = ({ open, onClose, onAdd, initialData }) => {
  const [teamName, setTeamName] = useState("");
  const [coach, setCoach] = useState("");

  useEffect(() => {
    if (initialData) {
      setTeamName(initialData.TeamName || "");
      setCoach(initialData.Coach || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const teamData = {
      ...initialData, // Include TeamID for editing
      TeamName: teamName,
      Coach: coach,
    };
    onAdd(teamData);
    setTeamName("");
    setCoach("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Team" : "Add Team"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Team Name"
          fullWidth
          margin="normal"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <TextField
          label="Coach"
          fullWidth
          margin="normal"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
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

export default AddTeamModal;