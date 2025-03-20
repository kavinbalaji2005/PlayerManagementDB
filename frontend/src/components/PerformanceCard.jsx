import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const PerformanceCard = ({ performance, type, onEdit, onDelete }) => {
  const renderFields = () => {
    if (type === "batting") {
      return (
        <>
          <Typography variant="body2">
            <strong>Matches Played:</strong> {performance.MatchesPlayed}
          </Typography>
          <Typography variant="body2">
            <strong>Innings:</strong> {performance.Innings}
          </Typography>
          <Typography variant="body2">
            <strong>Runs:</strong> {performance.Runs}
          </Typography>
          <Typography variant="body2">
            <strong>Highest Score:</strong> {performance.HighestScore}
          </Typography>
          <Typography variant="body2">
            <strong>Batting Average:</strong> {performance.BattingAverage}
          </Typography>
          <Typography variant="body2">
            <strong>Strike Rate:</strong> {performance.StrikeRate}
          </Typography>
          <Typography variant="body2">
            <strong>Fifties:</strong> {performance.Fifties}
          </Typography>
          <Typography variant="body2">
            <strong>Hundreds:</strong> {performance.Hundreds}
          </Typography>
        </>
      );
    } else if (type === "bowling") {
      return (
        <>
          <Typography variant="body2">
            <strong>Matches Played:</strong> {performance.MatchesPlayed}
          </Typography>
          <Typography variant="body2">
            <strong>Innings:</strong> {performance.Innings}
          </Typography>
          <Typography variant="body2">
            <strong>Runs Conceded:</strong> {performance.RunsConceded}
          </Typography>
          <Typography variant="body2">
            <strong>Wickets:</strong> {performance.Wickets}
          </Typography>
          <Typography variant="body2">
            <strong>Best Bowling:</strong> {performance.BestBowling}
          </Typography>
          <Typography variant="body2">
            <strong>Economy:</strong> {performance.Economy}
          </Typography>
          <Typography variant="body2">
            <strong>Bowling Strike Rate:</strong> {performance.BowlingStrikeRate}
          </Typography>
        </>
      );
    } else if (type === "fielding") {
      return (
        <>
          <Typography variant="body2">
            <strong>Matches Played:</strong> {performance.MatchesPlayed}
          </Typography>
          <Typography variant="body2">
            <strong>Run Outs:</strong> {performance.RunOuts}
          </Typography>
          <Typography variant="body2">
            <strong>Catches:</strong> {performance.Catches}
          </Typography>
          <Typography variant="body2">
            <strong>Stumpings:</strong> {performance.Stumpings}
          </Typography>
        </>
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Player ID: {performance.PlayerID}</Typography>
        {renderFields()}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(performance)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(performance.PlayerID)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PerformanceCard;