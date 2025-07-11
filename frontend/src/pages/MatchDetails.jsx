import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import API from "../services/api";

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [battingPerformances, setBattingPerformances] = useState([]);
  const [bowlingPerformances, setBowlingPerformances] = useState([]);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await API.get(`/matches/${id}`);
        setMatch(response.data.match);
        setBattingPerformances(response.data.battingPerformances);
        setBowlingPerformances(response.data.bowlingPerformances);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };
    fetchMatchDetails();
  }, [id]);

  if (!match) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Match Details
      </Typography>
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6">
            {match.Team1.TeamName} vs {match.Team2.TeamName}
          </Typography>
          <Typography variant="body2">Date: {new Date(match.Date).toLocaleDateString()}</Typography>
          <Typography variant="body2">Venue: {match.Venue}</Typography>
          <Typography variant="body2">Match Type: {match.MatchType}</Typography>
          <Typography variant="body2">
            Winner: {match.Winner ? match.Winner.TeamName : "TBD"}
          </Typography>
          <Typography variant="body2">
            Best Bowler: {match.BestBowler ? match.BestBowler.Name : "TBD"}
          </Typography>
          <Typography variant="body2">
            Best Batsman: {match.BestBatsman ? match.BestBatsman.Name : "TBD"}
          </Typography>
          <Typography variant="body2">
            Player of the Match: {match.PlayerOfTheMatch ? match.PlayerOfTheMatch.Name : "TBD"}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Batting Performances
      </Typography>
      <Grid container spacing={3}>
        {battingPerformances.map((performance) => (
          <Grid item xs={12} sm={6} md={4} key={performance.PlayerID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{performance.Player.Name}</Typography>
                <Typography variant="body2">Runs: {performance.Runs}</Typography>
                <Typography variant="body2">Balls Faced: {performance.BallsFaced}</Typography>
                <Typography variant="body2">Strike Rate: {performance.StrikeRate}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Bowling Performances
      </Typography>
      <Grid container spacing={3}>
        {bowlingPerformances.map((performance) => (
          <Grid item xs={12} sm={6} md={4} key={performance.PlayerID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{performance.Player.Name}</Typography>
                <Typography variant="body2">Wickets: {performance.Wickets}</Typography>
                <Typography variant="body2">Overs: {performance.Overs}</Typography>
                <Typography variant="body2">Economy: {performance.Economy}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MatchDetails;