module.exports = (sequelize, DataTypes) => {
  const tutorial = sequelize.define("tutorial", {
    title: { type: DataTypes.STRING },

    description: { type: DataTypes.STRING },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false },
    Image: { type: DataTypes.STRING, allowNull: true },
  });

  return tutorial;
};
