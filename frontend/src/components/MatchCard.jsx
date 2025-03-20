import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const MatchCard = ({ match, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Match ID: {match.MatchID}</Typography>
        <Typography variant="body2">
          <strong>Date:</strong> {new Date(match.Date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          <strong>Team 1:</strong> {match.Team1ID}
        </Typography>
        <Typography variant="body2">
          <strong>Team 2:</strong> {match.Team2ID}
        </Typography>
        <Typography variant="body2">
          <strong>Winner:</strong> {match.WinnerTeamID}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(match)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(match.MatchID)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchCard;