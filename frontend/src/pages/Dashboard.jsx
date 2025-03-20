import React from "react";
import { Typography, Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Player Management System
      </Typography>
      <Typography variant="body1">
        Use the navigation bar to manage players, teams, matches, and more.
      </Typography>
    </Container>
  );
};

export default Dashboard;