module.exports = (sequelize, DataTypes) => {
  const Achievements = sequelize.define("Achievements", {
    AchievementID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    PlayerID: { type: DataTypes.INTEGER },
    Award: { type: DataTypes.STRING(100) },
    Date: { type: DataTypes.DATE }
  },
  {
    timestamps: false
  });

  Achievements.associate = (models) => {
    Achievements.belongsTo(models.Player, { foreignKey: "PlayerID" });
  };

  return Achievements;
};
