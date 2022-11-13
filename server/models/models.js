const sequilize = require("../db.js");
const { DataTypes } = require("sequelize");

const User = sequilize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = { User };
