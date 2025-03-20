import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const TeamCard = ({ team, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{team.TeamName}</Typography>
        <Typography variant="body2">
          <strong>Coach:</strong> {team.Coach}
        </Typography>
        <Typography variant="body2">
          <strong>Captain:</strong> {team.Captain ? team.Captain.Name : "N/A"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(team)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(team.TeamID)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeamCard;