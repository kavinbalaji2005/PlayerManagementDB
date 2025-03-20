import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditPerformanceModal = ({ open, onClose, onSave, initialData, type }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const renderFields = () => {
    if (type === "batting") {
      return (
        <>
          <TextField
            label="Matches Played"
            fullWidth
            margin="normal"
            value={formData.MatchesPlayed || ""}
            onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
          />
          <TextField
            label="Innings"
            fullWidth
            margin="normal"
            value={formData.Innings || ""}
            onChange={(e) => handleChange("Innings", e.target.value)}
          />
          <TextField
            label="Runs"
            fullWidth
            margin="normal"
            value={formData.Runs || ""}
            onChange={(e) => handleChange("Runs", e.target.value)}
          />
          <TextField
            label="Highest Score"
            fullWidth
            margin="normal"
            value={formData.HighestScore || ""}
            onChange={(e) => handleChange("HighestScore", e.target.value)}
          />
          <TextField
            label="Batting Average"
            fullWidth
            margin="normal"
            value={formData.BattingAverage || ""}
            onChange={(e) => handleChange("BattingAverage", e.target.value)}
          />
          <TextField
            label="Strike Rate"
            fullWidth
            margin="normal"
            value={formData.StrikeRate || ""}
            onChange={(e) => handleChange("StrikeRate", e.target.value)}
          />
          <TextField
            label="Fifties"
            fullWidth
            margin="normal"
            value={formData.Fifties || ""}
            onChange={(e) => handleChange("Fifties", e.target.value)}
          />
          <TextField
            label="Hundreds"
            fullWidth
            margin="normal"
            value={formData.Hundreds || ""}
            onChange={(e) => handleChange("Hundreds", e.target.value)}
          />
        </>
      );
    } else if (type === "bowling") {
      return (
        <>
          <TextField
            label="Matches Played"
            fullWidth
            margin="normal"
            value={formData.MatchesPlayed || ""}
            onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
          />
          <TextField
            label="Innings"
            fullWidth
            margin="normal"
            value={formData.Innings || ""}
            onChange={(e) => handleChange("Innings", e.target.value)}
          />
          <TextField
            label="Runs Conceded"
            fullWidth
            margin="normal"
            value={formData.RunsConceded || ""}
            onChange={(e) => handleChange("RunsConceded", e.target.value)}
          />
          <TextField
            label="Wickets"
            fullWidth
            margin="normal"
            value={formData.Wickets || ""}
            onChange={(e) => handleChange("Wickets", e.target.value)}
          />
          <TextField
            label="Best Bowling"
            fullWidth
            margin="normal"
            value={formData.BestBowling || ""}
            onChange={(e) => handleChange("BestBowling", e.target.value)}
          />
          <TextField
            label="Economy"
            fullWidth
            margin="normal"
            value={formData.Economy || ""}
            onChange={(e) => handleChange("Economy", e.target.value)}
          />
          <TextField
            label="Bowling Strike Rate"
            fullWidth
            margin="normal"
            value={formData.BowlingStrikeRate || ""}
            onChange={(e) => handleChange("BowlingStrikeRate", e.target.value)}
          />
        </>
      );
    } else if (type === "fielding") {
      return (
        <>
          <TextField
            label="Matches Played"
            fullWidth
            margin="normal"
            value={formData.MatchesPlayed || ""}
            onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
          />
          <TextField
            label="Run Outs"
            fullWidth
            margin="normal"
            value={formData.RunOuts || ""}
            onChange={(e) => handleChange("RunOuts", e.target.value)}
          />
          <TextField
            label="Catches"
            fullWidth
            margin="normal"
            value={formData.Catches || ""}
            onChange={(e) => handleChange("Catches", e.target.value)}
          />
          <TextField
            label="Stumpings"
            fullWidth
            margin="normal"
            value={formData.Stumpings || ""}
            onChange={(e) => handleChange("Stumpings", e.target.value)}
          />
        </>
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {type.charAt(0).toUpperCase() + type.slice(1)} Performance</DialogTitle>
      <DialogContent>{renderFields()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPerformanceModal;