// filepath: d:\Projects\Player Management System\backend\models\player.js
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
    PlayerID: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    Name: { type: DataTypes.STRING, allowNull: false },
    Age: { type: DataTypes.INTEGER, allowNull: false },
    Role: { type: DataTypes.STRING, allowNull: false },
    TeamID: { type: DataTypes.INTEGER, allowNull: true },
    TotalMatches: DataTypes.INTEGER,
    Wins: DataTypes.INTEGER,
    Losses: DataTypes.INTEGER,
    // Removed Status column
  },
  {
    timestamps: false // Disable timestamps
  });

  Player.associate = (models) => {
    Player.belongsTo(models.Team, { foreignKey: "TeamID" });
    Player.hasOne(models.CaptaincyPerformance, { foreignKey: "PlayerID" });
    Player.hasOne(models.BattingPerformance, { foreignKey: "PlayerID" });
    Player.hasOne(models.BowlingPerformance, { foreignKey: "PlayerID" });
    Player.hasOne(models.FieldingPerformance, { foreignKey: "PlayerID" });
    Player.hasMany(models.Achievements, { foreignKey: "PlayerID" });
  };

  return Player;
};