module.exports = function(sequelize, DataTypes) {
  const Burger = sequelize.define("Burger", {
    text: DataTypes.STRING,
    isEaten: { type: DataTypes.BOOLEAN, defaulValue: false }
  });
  return Burger;
};
