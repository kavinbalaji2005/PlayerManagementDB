import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const PlayerCard = ({ player, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{player.Name}</Typography>
        <Typography variant="body2">
          <strong>Age:</strong> {player.Age}
        </Typography>
        <Typography variant="body2">
          <strong>Role:</strong> {player.Role}
        </Typography>
        <Typography variant="body2">
          <strong>Total Matches:</strong> {player.TotalMatches}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(player)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(player.PlayerID)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;