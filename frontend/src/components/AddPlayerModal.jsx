import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddPlayerModal = ({ open, onClose, onAdd, initialData }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.Name || "");
      setAge(initialData.Age || "");
      setRole(initialData.Role || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const playerData = {
      ...initialData, // Include PlayerID for editing
      Name: name,
      Age: parseInt(age),
      Role: role,
    };
    onAdd(playerData);
    setName("");
    setAge("");
    setRole("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Player" : "Add Player"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Role"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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

export default AddPlayerModal;