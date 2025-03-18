const { sequelize, User, Team, Player, Match, Achievements, BattingPerformance, BowlingPerformance, FieldingPerformance, CaptaincyPerformance } = require("./models");

const seedDatabase = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });

    // Create Users
    const users = await User.bulkCreate([
      { username: "admin", password: "admin123", role: "Admin" },
      { username: "coach", password: "coach", role: "Coach" },
    ]);

    // Create Teams
    const teams = await Team.bulkCreate([
      { TeamName: "Team A", Coach: "Coach A" },
      { TeamName: "Team B", Coach: "Coach B" },
    ]);

    // Create Players
    const players = await Player.bulkCreate([
      { Name: "Player 1", Age: 25, Role: "Batsman", TeamID: teams[0].TeamID, TotalMatches: 50, Wins: 30, Losses: 20, Status: "Active" },
      { Name: "Player 2", Age: 28, Role: "Bowler", TeamID: teams[0].TeamID, TotalMatches: 60, Wins: 35, Losses: 25, Status: "Active" },
      { Name: "Player 3", Age: 22, Role: "All-rounder", TeamID: teams[1].TeamID, TotalMatches: 40, Wins: 20, Losses: 20, Status: "Available" },
    ]);

    // Create Matches
    const matches = await Match.bulkCreate([
      { Date: new Date(), Team1ID: teams[0].TeamID, Team2ID: teams[1].TeamID, WinnerTeamID: teams[0].TeamID },
      { Date: new Date(), Team1ID: teams[1].TeamID, Team2ID: teams[0].TeamID, WinnerTeamID: teams[1].TeamID },
    ]);

    // Create Achievements
    const achievements = await Achievements.bulkCreate([
      { PlayerID: players[0].PlayerID, Award: "Best Batsman", Date: new Date() },
      { PlayerID: players[1].PlayerID, Award: "Best Bowler", Date: new Date() },
    ]);

    // Create Performances
    const battingPerformances = await BattingPerformance.bulkCreate([
      { PlayerID: players[0].PlayerID, MatchesPlayed: 50, Innings: 45, Runs: 2000, HighestScore: 150, BattingAverage: 45.0, StrikeRate: 90.0, Fifties: 15, Hundreds: 5 },
    ]);

    const bowlingPerformances = await BowlingPerformance.bulkCreate([
      { PlayerID: players[1].PlayerID, MatchesPlayed: 60, Innings: 55, RunsConceded: 1500, Wickets: 100, BestBowling: "5/30", Economy: 4.5, BowlingStrikeRate: 30.0 },
    ]);

    const fieldingPerformances = await FieldingPerformance.bulkCreate([
      { PlayerID: players[2].PlayerID, MatchesPlayed: 40, RunOuts: 10, Catches: 20, Stumpings: 5 },
    ]);

    const captaincyPerformances = await CaptaincyPerformance.bulkCreate([
      { PlayerID: players[0].PlayerID, MatchesAsCaptain: 20, WinPercentage: 60.0, LossPercentage: 40.0 },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();