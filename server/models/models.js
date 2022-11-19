const sequilize = require("../db.js");
const { DataTypes } = require("sequelize");

const User = sequilize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = { User };
